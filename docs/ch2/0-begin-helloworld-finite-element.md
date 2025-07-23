# 微分方程数值解法

## 单步方法

### Euler 法

对于初值问题(1)

$$
\left\{\begin{matrix}
{u}'=f(t,u), t_0<t \le T,  \\
u(t_0)=a,
\end{matrix}\right.
$$

我们并不试图在自变量的整个连续区间上去逼近精确解 $u(t)$, 只是在 $N$ 个离散点 $\{t_m\}^N_{m=1}$上考虑近似解 $\{U_m\}^N_{m=1}$, 这里 $t_1,t_2,...,t_N \le T $ 称为 N 个**节点**, 它们满足关系

$$
t_{m+1}=t_m + h_{m+1},m=0,1,...,N-1,
$$

$\{h_m\}^N_{m=1}$ 是一组被称为**步长**的正数(如果当 $h_m=h=C,C为常数$，这组结点被称为**等步长**的)。

Euler 方法是通过斜率来研究的，因为斜率已经给出了，当 $h$ 很小的时候，用过 (t_0,u_0)的点斜式直线方程在 $t_1$ 处的值 $u_1$ 来近似代替 $u(t_1)$ ，即

$$
\frac{u_1-u_0}{t_1-t_0} = f(t_0,u_0)
$$

由于这时 $h=t_1-t_0$，所以公式可以转换成

$$
u_1 = u_0 + hf(t_0,u_0),
$$

得到 $u_1$之后，由于 $t_1$ 是知道的，又可以推出 $u_2$。以此类推，得到 $\{u_m\}^N_{m=1}$ 的递推公式：

$$
\left\{\begin{matrix}
u_{m+1}=u_m+hf(t_m,u_m), m=0,1,...,N-1,  \\
u_0=u(t_0)=a,
\end{matrix}\right.
$$

上述方法就是 Euler 方法，也称 Euler-Cauchy 折线法。

<div style={{ textAlign: 'center', marginTop: '10px' }}>
  <img
    src="https://s2.loli.net/2025/07/22/OQyzv9j21tNYbgC.jpg"
    alt="Euler方法示意图"
    style={{ width: '60%' }}
  />
  <p style={{ fontSize: '90%', color: 'gray' }}>
    <em>图 1：示意图</em>
  </p>
</div>

对于 Euler 方法可以有三种不同的解释：

- (1) 数值微分：用最简单的向前差商 $\frac{u(t+h)-u(t)}{h}$ 来近似代替 ${u}'(t)$，即有

$$
u(t+h)\approx u(t)+hf(t,u(t)),
$$

- (2) 数值积分：在$[t,t+h]$对方程(1)两端积分，并采用左矩形公式，有

$$
u(t+h)-u(t)=\int^{t+h}_tf(\tau,u(\tau))d\tau \approx hf(t,u(t)),
$$

- (3) 幂级数展开：将 $u(t+h)$ 在 $t$ 作 Taylor 展开，并略去 $h^2$ 以上的项，有

$$
u(t+h) = u(t)+hu'(t)+\frac{h^2}{2!}u''(t)+\cdots \approx u(t)+hf(t,u(t)),
$$

在以上三式中令 $t=t_m$ ，并用 $t_m$ 记 $u(t_m)$ 的近似值。

### 算例 1

用 Euler 方法解初值问题

$$
\left\{\begin{matrix}
u'=u-\frac{2t}{u},0<t\le1  \\
u_0=1,
\end{matrix}\right.
$$

它的真解为 $u(t)=\sqrt{1+2t}$，设定步长公式为 $h^{(i)}=\frac{1}{2^{4i}},(i=1,2),h^{(3)}=\frac{1}{2^{10}}$(h 取为 $2^{-n}$ 形式可避免计算步长时的误差)，则 $t^{(i)}_m=mh^{(i)}$，用 Euler 公式，有

$$
u^{(i)}_{m+1} = u^{(i)}_{m} + h^{(i)}(u^{(i)}_m-\frac{2mh^{(i)}}{u^{(i)}_m})。
$$

下面我们来进行实验

这是使用了 Euler 最基本的方法对应上面提到的(1) 数值微分

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example1/1.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 2：三种不同的步长Euler法-数值微分计算结果
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example1/2.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 3：三种不同的步长Euler法-数值微分计算误差
    </figcaption>
  </figure>
</div>

这是使用了 Euler 进阶一点的方法对应上面提到的(2) 数值积分

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example1/3.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 4：三种不同的步长Euler法-数值积分计算结果
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example1/4.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 5：三种不同的步长Euler法-数值积分计算误差
    </figcaption>
  </figure>
</div>

这是使用了 Euler 进阶一点的方法对应上面提到的(3) 幂级数展开（只到二阶）

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example1/5.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 6：三种不同的步长Euler法-幂级数展开计算结果
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example1/6.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 7：三种不同的步长Euler法-幂级数展开计算误差
    </figcaption>
  </figure>
</div>

三种方法在耗时以及误差上的比较,可以看出最耗时间是积分法，幂级数展开法（二阶）与微分法差别不大：

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example1/error_vs_h.png?raw=true"
      alt="三种方法在误差上的比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 8：三种方法在误差上的比较
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example1/time_vs_h.png?raw=true"
      alt="三种方法在耗时上的比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 9：三种方法在耗时上的比较
    </figcaption>
  </figure>
</div>
