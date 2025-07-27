# 高阶单步法

Eular 方法简单易行，理论上可以通过取充分小的 $h$ 而达到任意高的精度，但终因收敛阶数低而不实用，只有在解很不光滑的情况下使用。

## Taylor 级数法

对于初值问题(1)：

$$
\left\{
\begin{aligned}
&{u}'=f(t,u), t_0<t \le T,  \\
&u(t_0)=a,\tag{1}
\end{aligned}
\right.
$$

设 $u(t)$ 为初值问题(1)的解，且在 $[t_0,T]$ 上有 $q+1$ 阶连续导数，我们将 $u(t_m+h)$ 在 $t_m$ 处作 $q+1$ 项 Taylor 展开：

$$
u(t_m+h) = u(t_m)+hu'(t_m)+\frac{h^2}{2!}u''(t_m) + \dots + \frac{h^q}{q!}u^{(q)}(t_m)+O(h^{q+1}), \tag{2}
$$

由于 $u(t)$ 满足微分方程，因此其各阶导数 $u^{(j)}(t)$ 可以通过将 $f(t,u(t))$ 对 $t$ 复合求导 $j-1$ 次复合求导 $j-1$ 次得到,

$$
\left\{
\begin{aligned}
u'   &= f, \\
u''  &= \frac{d}{dt}f = f_t + f_{tt}f, \\
u''' &= \frac{d^2}{dt^2}f = f_{tt} + 2ff_{tu} + f^2f_{uu} + f_{tt}(f_t + f_{tt}f),\\
& \dots \dots \tag{3}
\end{aligned}
\right.
$$

这里 $\frac{d^j}{dt^j}$ 表示 $j$ 阶全导数。将(2)式中 $O(h^{q+1})$ 项舍去，即得到近似格式：

$$
\left\{
\begin{aligned}
u_{m+1} &= u_m+h\varphi(t_m,u_m;h),\\
u_0&=a. \tag{4}
\end{aligned}
\right.
$$

这里

$$
\varphi (t,u(t);h)=\sum^q_{j=1}\frac{h^{j-1}}{j!}\frac{d^{j-1}}{dt^{j-1}}f(t,u(t)).\tag{5}
$$

上面的两条式子就称为 **$q$ 阶 Taylor 记数法**，其局部截断误差就是 Taylor 展开的余项，即

$$
R_m=\frac{h^{q+1}}{(q+1)!}\frac{d^{1+1}}{dt^{q+1}}f(t_m+\theta h,u(t_m+\theta h)),0\le\theta\le1.
$$

当$q=1$时，Talyor 级数为 Euler 方法。

### 算例 2.4

例 2.4 用 Taylor 级数法求

$$
\left\{
\begin{aligned}
& u' = t-u^2,\\
& u(0)=0,
\end{aligned}
\right.
$$

在 t=h 处的近似值。

**解：** 直接利用复合函数的链式求导法则(3)（直接套用即可），有

$$
\left\{\begin{aligned}
&u^{\prime}=t-u^{2} \\
&u^{\prime \prime}=1-2 u u^{\prime} \\
&u^{\prime \prime \prime}=-2\left[\left(u^{\prime}\right)^{2}+u u^{\prime \prime}\right] \\
&u^{(4)}=-2\left[3 u^{\prime} u^{\prime \prime}+u u^{\prime \prime \prime}\right] \\
&u^{(5)}=-2\left[3\left(u^{\prime \prime}\right)^{2}+4 u^{\prime} u^{\prime \prime \prime}+u u^{(4)}\right] \\
&\ldots \ldots
\end{aligned}\right.
$$

通过我们已知 $u(0)=0$ 可以得到以下结果：

$$
\left\{\begin{aligned}
&u^{\prime}=0 \\
&u^{\prime \prime}=1 \\
&u^{\prime \prime \prime}=0 \\
&u^{(4)}=0 \\
&u^{(5)}=-6 \\
&\ldots \ldots
\end{aligned}\right.
$$

代入 Taylor 级数法，可得

$$
u(h)=\frac{h^2}{2}-\frac{h^5}{20}+\frac{h^8}{160}+\dots,
$$

在上式中截取所需要的项就可以了。同样的，我们来实现一下该算法思想：

首先，我们通过上述例子可以设置步长为 h，这里面其实就包含了上一个解和下一个解的关系，类似于 Euler 法，我们同样可以提出一个显式的迭代格式有：

$$
u_{m+1} = u_{m} + hu\prime(t_m) + \dots + \frac{h^q}{q!}u^{(q)}(t_m)+O(h^{q+1}),
$$

我们设置初始条件为 $u_0=0,t_0=0,T=1$,步长跟算例 1 一致设置三种步长分别为 $\frac{1}{2^4},\frac{1}{2^8},\frac{1}{2^{10}}$，以下是我们得到的结果，首先是不同阶在步长都是 $\frac{1}{2^4}$ 情况下的图像展示：

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example3/1.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 1：2,5,8阶Taylor级数法在步长为 $\frac{1}{2^4}$ 的结果
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example3/2.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 2：2,5,8阶Taylor级数法在步长为 $\frac{1}{2^4}$ 的误差
    </figcaption>
  </figure>
</div>

为了能够看出步长对 Taylor 级数法的影响，我们还对 8 阶 Taylor 级数法使用了不同的步长分别为 $\frac{1}{2^4},\frac{1}{2^8},\frac{1}{2^{10}}$ 得到了如下图的结果：

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example3/3.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 3：8阶Taylor级数法在步长为 $\frac{1}{2^4},\frac{1}{2^8},\frac{1}{2^{10}}$ 的结果
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example3/4.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 4：8阶Taylor级数法在步长为 $\frac{1}{2^4},\frac{1}{2^8},\frac{1}{2^{10}}$ 的误差
    </figcaption>
  </figure>
</div>

## Runge-Kutta 法

$N$ 级 Runge-Kutta 方法只是将(4)中的增量函数取作

$$
\varphi(t,u;h)=\sum^N_{i=1}c_ik_i,\tag{6}
$$

其中

$$
\left\{\begin{aligned}
&k_1=f(t,u), \\
&k_i=f(t+a_ih,u+h\sum^{i-1}_{j=1}b_{ij}k_j),i=2,3,\dots N, \\
&a_i=\sum^{i-1}_{j=1}b_{ij}. \\
\end{aligned} \tag{7}
\right.
$$

当 $N=1$ 时，又回到了 Euler 方法。当 $N>1$ 时，我们通过选取参数，使方法具有尽可能高的精度。具体做法是，利用二元函数的 Taylor 展开形式：

$$
f(x+h,y+k)=\sum^{\infty}_{i=0}\frac{1}{i!}(h\frac{\partial}{\partial x}+k\frac{\partial}{\partial y})^if(x,y) \tag{8}
$$

将(7)式中各项在 $(t,u)$ 处展开后代入(6)式，再令其与(5)式中幂次相同的 $h$ 项的系数相等，便得到一个关于 $a_i,b_{ij},c_i$ 的方程组就得到了具体的计算格式。

### 二阶方法：

取 $N=2$ ,利用(8)式将 $k_2$ 在 $(t,u)$ 展开成 Taylor 级数，得到

$$
\begin{aligned}
k_{2}= & f\left(t+a_{2} h, u+h b_{21} k_{1}\right) \\
= & f(t, u)+\left[a_{2} h f_{t}+h b_{21} k_{1} f_{u}\right] +\frac{1}{2}\left[\left(a_{2} h\right)^{2} f_{u}+2 a_{2} b_{21} h^{2} k_{1} f_{t u}+\left(b_{21} h\right)^{2} k_{1}^{2} f_{u u}\right]+O\left(h^{3}\right)
\end{aligned}
$$

注意到 $k_1=f(t,u),b_{21}=a_2$, 所以

$$
\varphi(t, u ; h)=\left(c_{1}+c_{2}\right) f+c_{2} a_{2} h F+\frac{c_{2} a_{2}^{2} h^{2}}{2} G+O\left(h^{3}\right) \tag{9}
$$

这里 $F=f*{t}+f f*{u}, G=f*{u}+2 f*{t u} f+f\_{u u} f^{2} $.

另一方面，根据(3)和(5)，有

$$
\begin{aligned}
\varphi(t, u ; h) & =f(t, u)+\frac{h}{2} \frac{\mathrm{~d}}{\mathrm{~d} t} f(t, u)+\frac{h^{2}}{6} \frac{\mathrm{~d}^{2}}{\mathrm{~d} t^{2}} f(t, u)+O\left(h^{3}\right) \\
& =f+\frac{h}{2} F+\frac{h^{2}}{6}\left(G+f_{u} F\right)+O\left(h^{3}\right) \tag{10}
\end{aligned}
$$

比较(9)式和(10)式中关于 h 幂次项的系数，即有方程组：

$$
\left\{\begin{array}{l}
c_{1}+c_{2}=1 \\
c_{2} a_{2}=\frac{1}{2}
\end{array}\right.
$$

从而得到一个参数的**解族**。比较常见的二级方法如下：

#### 中点法：

取 $c_1=0,c_2=1,a_2=\frac{1}{2}$,此时

$$
u_{m+1}=u_{m}+h f\left(t_{m}+\frac{h}{2}, u_{m}+\frac{h}{2} f\left(t_{m}, u_{m}\right)\right),
$$

这被称为**修正的 Euler 法（或中点法）**。

#### Runge-Kutta 二阶法：

取 $c_1=c_2=\frac{1}{2},a_2=1$,此时

$$
u_{m+1}=u_m+\frac{h}{2}[f(t_m,u_m)+f(t_m+h,u_m+hf(t_m,u_m))]
$$

#### Heun 二阶法：

当 $c_2a_2^2=\frac{1}{3}$,也即当 $c_1=\frac{1}{4},c_2=\frac{3}{4},a_2=\frac{2}{3}$ 时，即

$$
u_{m+1}=u_m+\frac{h}{4}[f(t_m,u_m)+3f(t_m+\frac{2}{3}h,u_m+\frac{2h}{3}f(t_m,u_m))]
$$

### 三阶方法：

取 $N=3$ ,可得方程组为

$$
\left\{\begin{array}{l}
c_{1}+c_{2}+c_{3}=1 \\
c_{2} a_{2}+c_{3} a_{3}=\frac{1}{2} \\
c_{2} a_{2}^{2}+c_{3} a_{3}^{2}=\frac{1}{3} \\
c_{3} a_{2} b_{32}=\frac{1}{6}
\end{array}\right.
$$

该格式对应的局部截断误差为 $O(h^4)$ ,下面是常用的两个三阶算法

#### Kutta 三阶方法：

$$
\left\{\begin{aligned}
&u_{m+1} =u_{m}+\frac{h}{6}\left(k_{1}+4 k_{2}+k_{3}\right) \\
&k_{1} =f\left(t_{m}, u_{m}\right) \\
&k_{2} =f\left(t_{m}+\frac{h}{2}, u_{m}+\frac{h}{2} k_{1}\right) \\
&k_{3} =f\left(t_{m}+h, u_{m}-h k_{1}+2 h k_{2}\right)
\end{aligned}\right.
$$

容易看出， $f(t,u)$ 与 $u$ 无关时，它恰为 Simpson 公式。

#### Henu 三阶方法：

其导出思想与 Heun 二阶方法完全一致，形式也差不多，为

$$
\left\{\begin{aligned}
&u_{m+1} =u_{m}+\frac{h}{4}\left(k_{1}+3 k_{3}\right) \\
&k_{1} =f\left(t_{m}, u_{m}\right) \\
&k_{2} =f\left(t_{m}+\frac{h}{3}, u_{m}+\frac{h}{3} k_{1}\right) \\
&k_{3} =f\left(t_{m}+\frac{2 h}{3}, u_{m}+\frac{2 h}{3} k_{2}\right)
\end{aligned}\right.
$$

### 四阶方法：

类似地，当 $N=4$ 时，含 13 个未知量，11 个方程组成的方程组，局部截断误差为 $O(h^5)$. 常用以下两种：

#### 古典 Runge-Kutta 方法

这是最常用的，当 $f(t,u)$ 与 u 无关的时就是 Simpson 公式。

$$
\left\{\begin{array}{l}
&u_{m+1}=u_{m}+\frac{h}{6}\left(k_{1}+2 k_{2}+2 k_{3}+k_{4}\right), \\
&k_{1}=f\left(t_{m}, u_{m}\right), \\
&k_{2}=f\left(t_{m}+\frac{h}{2}, u_{m}+\frac{h}{2} k_{1}\right), \\
&v_{3}=f\left(t_{m}+\frac{h}{2}, u_{m}+\frac{h}{2} k_{2}\right), \\
&k_{4}=f\left(t_{m}+h, u_{m}+h k_{3}\right) .
\end{array}\right.
$$

#### Kutta 四阶方法

它的导出思想与 Kutta 三阶方法相四个结点的 Newton－Cotes 数值积分公式（四个结点的 Newton-Cotes 数值积分公式）。

$$
\left\{\begin{aligned}
u_{m+1} & =u_{m}+\frac{h}{8}\left(k_{1}+3 k_{2}+3 k_{3}+k_{4}\right) \\
k_{1} & =f\left(t_{m}, u_{m}\right) \\
k_{2} & =f\left(t_{m}+\frac{h}{3}, u_{m}+\frac{h}{3} k_{1}\right) \\
k_{3} & =f\left(t_{m}+\frac{2 h}{3}, u_{m}-\frac{h}{3} k_{1}+h k_{2}\right) \\
k_{4} & =f\left(t_{m}+h, u_{m}+h k_{1}-h k_{2}+h k_{3}\right)
\end{aligned}\right.
$$

## 算例 2.5

用 Runge-Kutta 方法求解:

$$
\left\{\begin{aligned}
& u\prime = u - \frac{2t}{u},0<t\le1, \\
&u(0)=1.
\end{aligned}\right.
$$

解：
我们使用上面的所有格式进行实验，首先取步长为 $\frac{1}{2^4}$ 然后得到了二阶 Runge-Kutta 方法的比较如下图所示：

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example4/1.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 5：2阶Runge-Kutta法在步长为 $\frac{1}{2^4}$ 的结果
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example4/2.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 6：2阶Runge-Kutta法在步长为 $\frac{1}{2^4}$ 的误差
    </figcaption>
  </figure>
</div>

三阶 Runge-Kutta 方法的比较如下：

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example4/3.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 7：3阶Runge-Kutta法在步长为 $\frac{1}{2^4}$ 的结果
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example4/4.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 8：3阶Runge-Kutta法在步长为 $\frac{1}{2^4}$ 的误差
    </figcaption>
  </figure>
</div>

四阶 Runge-Kutta 方法的比较如下：

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example4/5.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 9：4阶Runge-Kutta法在步长为 $\frac{1}{2^4}$ 的结果
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example4/6.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 10：4阶Runge-Kutta法在步长为 $\frac{1}{2^4}$ 的误差
    </figcaption>
  </figure>
</div>

上文中提到所有 Runge-Kutta 方法在时间步长为 $\frac{1}{2^4},\frac{1}{2^{10}}$ 的误差结果比较

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example4/7.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 9：所有Runge-Kutta法在步长为 $\frac{1}{2^4}$ 的误差比较
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example4/8.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 10：所有Runge-Kutta法在步长为 $\frac{1}{2^{10}}$ 的误差比较
    </figcaption>
  </figure>
</div>
