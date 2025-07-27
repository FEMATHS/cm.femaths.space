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
u_0&=a.
\end{aligned}
\right.
$$

这里

$$
\varphi (t,u(t);h)=\sum^q_{j=1}\frac{h^{j-1}}{j!}\frac{d^{j-1}}{dt^{j-1}}f(t,u(t)).
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

我们设置初始条件为 $u_0=0,t_0=0,T=1$,步长跟算例 1 一致设置三种步长分别为 $2^4,2^8,2^{10}$，以下是我们得到的结果，首先是不同阶在步长都是 $2^4$ 情况下的图像展示：

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example3/1.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 1：2,5,8阶Taylor级数法在步长为 $2^4$ 的结果
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example3/2.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 2：2,5,8阶Taylor级数法在步长为 $2^4$ 的误差
    </figcaption>
  </figure>
</div>

为了能够看出步长对 Taylor 级数法的影响，我们还对 8 阶 Taylor 级数法使用了不同的步长分别为 $2^4,2^8,2^{10}$ 得到了如下图的结果：

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example3/3.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 3：8阶Taylor级数法在步长为 $2^4,2^8,2^{10}$ 的结果
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example3/4.png?raw=true"
      alt="Euler方法示意图"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'gray', fontStyle: 'italic', marginTop: '4px' }}>
      图 4：8阶Taylor级数法在步长为 $2^4,2^8,2^{10}$ 的误差
    </figcaption>
  </figure>
</div>

## Runge-Kutta 法
