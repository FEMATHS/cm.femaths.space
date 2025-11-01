import DiffusionSolver from '@site/src/components/DiffusionSolver';

# 发展方程的差分方法

自然现象和社会现象中许多要解决的问题所归结的数学模型中，大量的是含有两个或更多个独立变量的函数的微分方程，即偏微分方程。

偏微分方程可按它与时间有关与否分成两类。如一个物体内热量的稳态分布，在数学上可用第三章中的 Laplace 方程来刻画，它与时间没有关系，我们称其为定常的。

但是更多的是一类与时间有关，即不定常的方程。求解这类问题就是要找到方程所描述的系统的状态随时间的变化而变化的规律，进而根据该系统在某个 $t_{0}$ 时刻的已知状态去确定它在 $t$ 时刻的状态。不定常的攻分方程问题也称为初值问题， $t_{0}$ 时刻系统的状态函数称为初始值。为了得到一个确定的解，经常必须对解函数在求解区域的边界（或其一部分）加上一些限制条件，这样的问题一般称为初边值问题。我们把一个适定的初（边）值问题（解存在唯一且连续依赖于初始值）称为发展方程。

用解析方法求解发展方程，并通过已知函数把解表示出来，这只有在极个别情况下才能做到，绝大多数情况都是要靠数值方法来追踪的。本章将讨论发展方程——主要是热传导方程和波动方程的差分方法。由于所考虑系统的状态量不仅与时间 $t$ 有关，还与空间坐标 $x$ （及 $y$,$z, \cdots$ ）有关，因此在作差分时，首先要把连续的时间－空间集转换成离散的网格点集，然后在网格点上考察系统的各种状态量。

## 扩散方程

假定有一根单位长度的细竿，当 $t=0$ 时在 $x$ 处的温度由已知函数 $\varphi(x)$ 确定 $\varphi(0)=\varphi(1)=0$，将细竿两端固定于冰上 (图 5.1), 则细竿在 $t$ 时刻的温度分布函数 $u(x,t)$ 应满足：

$$
\left\{\begin{array}{l}
\frac{\partial u}{\partial t}=a \frac{\partial^{2} u}{\partial x^{2}} \quad(a>0), 0<t \leqslant T, 0<x<1,  (5.1) \\
u(0, t)=u(1, t)=0, \quad t>0, (5.2)\\
u(x, 0)=\varphi(x), \quad 0 \leqslant x \leqslant 1, (5.3)
\end{array}\right.
$$

<img
src="https://github.com/FEMATHS/cm.femaths.space/blob/main/docs/src/ch3/5.jpg?raw=true"
style={{ display: 'block',margin: '0 auto',width: '50%' }}
/>

图 5.1 两端固定于冰上的细竿

这就是一维的热传导方程。在研究分子扩散过程（如液体的渗透、半导体材料中杂质的扩散等）时也会遇到类似形式的方程，因而方程(5.1)也叫扩散方程。

定解问题 $(5.1)、(5.2)、(5.3)$ 的解可通过分离变量法来求出，其思想是先求出满足方程 $(5.1)$ 和边界条件 $(5.2)$ 的无数个解，再进行适当的线性组合使其满足初值（5．3）。

设 $u(x,t)=X(x) T(t)$ ，代入方程 $(5.1)$，有

$$
\frac{X^{\prime \prime}(x)}{X(x)}=\frac{T^{\prime}(t)}{a T(t)},\tag{5.4}
$$

由于 $(5.4)$ 式的左边是 $x$ 的函数，其右边是 $t$ 的函数，所以它们必为常数，将该常数记为 $-\mu$ ，则由 $(5.4)$ 式和 $(5.2)$ 式，得到两个互相独立的方程：

$$
\left\{\begin{array}{l}
X^{\prime \prime}+\mu X=0, \\
X(0)=X(1)=0.\tag{5.5}
\end{array}\right.
$$

$$
T^{\prime}+\mu a T=0.\tag{5.6}
$$

方程 $(5.5)$ 的特征方程为

$$\lambda^2 + \mu = 0$$

易见，只有当$\mu > 0$，且$\mu = n^2\pi^2$时，方程 $(5.5)$ 才有非零解

$$
X(x) = X_n(x) = \sin n\pi x, \tag{5.7}
$$

此时方程 $(5.6)$ 的解为

$$
T(t) = \mathrm{e}^{-an^2\pi^2 t}, \tag{5.8}
$$

于是

$$
u(x, t) = \sum_{n=1}^{\infty} \alpha_n \mathrm{e}^{-an^2\pi^2 t} \sin n\pi x, \tag{5.9}
$$

令$t = 0$，则

$$
u(x, 0) = \sum_{n=1}^{\infty} \alpha_n \sin n\pi x = \varphi(x),
$$

因此(5.9)式中的系数 $\{\alpha_n\}_{n=1}^{\infty}$ 恰为 $\varphi(x)$（作了奇延拓之后）展开为 Fourier 级数的系数。当 $\varphi^{\prime}(x)$ 在 $[0, 1]$ 连续时，级数 $(5.9)$ 一致收敛，而且由于级数中 $\mathrm{e}^{-an^2\pi^2 t}$ 因子的出现，微分号可以通过求和号，即级数 $(5.9)$ 可以逐项求导，从而它确实是初边值问题 $(5.1)～(5.3)$ 的解。

若细竿的长度很大，而所需知道的只是在较短时间和较小范围内温度变化的情况，那么边界条件所产生的影响可以忽略，这时可以认为所考察的物体充满整个一维空间，于是可认为方程 $(5.1)$ 在 $-\infty < x < +\infty$ 上成立，其初始条件为

$$
u(x, 0) = \varphi(x),\ -\infty < x < \infty \tag{5.10}
$$

边界条件 $(5.2)$ 自然就消失了。这样的定解问题称为 Cauchy 问题，它的解可以写成

$$
\begin{align*}
u(x, t) &= \frac{1}{\sqrt{4\pi at}} \int_{-\infty}^{\infty} \mathrm{e}^{-\frac{(x-\xi)^2}{4at}} \varphi(\xi) \mathrm{d}\xi, \\
&-\infty < x < \infty,\ t \geqslant 0
\end{align*}
\tag{5.11}
$$

图 5.2 给出了初始(假设为三角形分布)及以后时刻的演化，其特点是波形的棱角消失，逐渐平滑。热传导中的温度变化过程和物质的扩散过程都有这样的性质：不管初始分布如何集中，它总是在瞬间影响到无限——尽管这种影响是随距离的增长而按指数衰减。这是典型的抛物型方程。

<img
src="https://github.com/FEMATHS/cm.femaths.space/blob/main/docs/src/ch3/6.jpg?raw=true"
style={{ display: 'block',margin: '0 auto',width: '50%' }}
/>

图 5.2 扩散方程的演化

### 2. 波动方程

波动方程最简单的形式为对流方程：

$$
\frac{\partial u}{\partial t} + a\frac{\partial u}{\partial x} = 0, \tag{5.12}
$$

设给定的初值条件为

$$
u(x, 0) = \varphi(x),\ -\infty < x < \infty, \tag{5.13}
$$

易见其解为

$$
u(x, t) = \varphi(x - at),\ -\infty < x < \infty,\ t \geqslant 0, \tag{5.14}
$$

这意味着在$O-xt$平面上沿任何一条直线： $x - at = $ 常数， $u$ 的值将保持不变，这族直线称为特征线(图 5.3)。

如果把 $(5.13)$ 式看为初始时刻 $t = 0$ 时的波形，则 $(5.14)$ 式就表示这个波形以速度 $|a|$ 传播；当 $a > 0$ 时波沿 $x$ 正向传播；当 $a < 0$ 时波沿

<img
src="https://github.com/FEMATHS/cm.femaths.space/blob/main/docs/src/ch3/7.jpg?raw=true"
style={{ display: 'block',margin: '0 auto',width: '50%' }}
/>

图 5.3 特征线

$x$ 负向传播，而波形保持不变，图 5.4 显示了这一情况。

<img
src="https://github.com/FEMATHS/cm.femaths.space/blob/main/docs/src/ch3/8.jpg?raw=true"
style={{ display: 'block',margin: '0 auto',width: '50%' }}
/>

图 5.4 波动方程的演化

对流方程表示的是一个单向传播的波，因而也称作单向波方程。常见的波动方程是

$$
\frac{\partial^2 u}{\partial t^2} = a^2\frac{\partial^2 u}{\partial x^2}\ (a > 0), \tag{5.15}
$$

令 $v_1 = \frac{\partial u}{\partial t},v_2 = a\frac{\partial u}{\partial x}$ ，则有

$$
\begin{cases}
\frac{\partial v_1}{\partial t} = a\frac{\partial v_2}{\partial x}, \\
\frac{\partial v_2}{\partial t} = a\frac{\partial v_1}{\partial x}.
\end{cases}
$$

再令 $w_1 = \frac{1}{2}(v_1 - v_2),w_2 = \frac{1}{2}(v_1 + v_2)$ ，则可将方程 $(5.15)$ 最终化为

$$
\begin{cases}
\frac{\partial w_1}{\partial t} + a\frac{\partial w_1}{\partial x} = 0, \\
\frac{\partial w_2}{\partial t} - a\frac{\partial w_2}{\partial x} = 0.
\end{cases}
\tag{5.16}
$$

这表示方程 $(5.15)$ 是由两个沿相反方向传播的单向波叠加而成的。

若方程 $(5.15)$ 满足初始条件

$$
u(x, 0) = \varphi(x),\ \frac{\partial u(x, 0)}{\partial t} = \psi(x) \tag{5.17}
$$

则其解可由 D'Alembert 公式给出：

$$
u(x, t) = \frac{\varphi(x - at) + \varphi(x + at)}{2} + \frac{1}{2a}\int_{x - at}^{x + at} \psi(\xi) d\xi \tag{5.18}
$$

从 $(5.18)$ 式可知，解 $u(x, t)$ 在某个 $(x_0, t_0)$ 处的值只依赖于 $x$ 轴的区间 $[x_0 - at_0, x_0 + at_0]$ 上的初始条件，而与其他点上的初始条件无关，因此这个区域被称为 $(x_0, t_0)$ 的依赖区域，它是过 $(x_0, t_0)$ 分别作斜率为 $\pm \frac{1}{a}$ 的直线与 $x$ 轴的交点之间的区间(图 5.5)。

<img
src="https://github.com/FEMATHS/cm.femaths.space/blob/main/docs/src/ch3/9.jpg?raw=true"
style={{ display: 'block',margin: '0 auto',width: '50%' }}
/>

图 5.5 $(x_0, t_0)$ 的依赖区域

对于波动方程也可以给出一定的边界条件。类似于初边值问题 $(5.1)～(5.3)$ 的定解问题也可以如扩散方程那样用分离变量法求出一个无穷的三角级数形式的解，这里不再作进一步叙述了。

波动方程是典型的双曲型方程，各种不同的双曲型方程，其波的形状、幅度均可有变化，但它总是以有限速度传播，并能保持明确的波阵面——这是这一类方程的共同特点。

### 3. 对流-扩散方程

在流体的热交换中，对流和传导并存，这时的数学模型成了方程 $(5.1)$ 和方程 $(5.12)$ 的耦合：

$$
\frac{\partial u}{\partial t} + a\frac{\partial u}{\partial x} - b\frac{\partial^2 u}{\partial x^2} = 0\ (b > 0), \tag{5.19}
$$

它在初始条件 $(5.10)$ 下的解为

$$
\begin{align*}
u(x, t) &= \frac{1}{\sqrt{4\pi bt}} \int_{-\infty}^{\infty} \mathrm{e}^{-\frac{(x - \xi - at)^2}{4bt}} \varphi(\xi) d\xi, \\
&-\infty < x < \infty,\ t \geqslant 0.
\end{align*}
\tag{5.20}
$$

当 $a = 0$ 时，它即为 Cauchy 问题的解 $(5.11)$ 。

图 5.6 表示的是初始为三角分布情况的演化情形。由于方程是由对流和扩散耦合而成的，因此演化兼具两者的特点：一方面平滑，另一方面仿佛以速度 $a$ 移动，但不能保持波阵面。

<img
src="https://github.com/FEMATHS/cm.femaths.space/blob/main/docs/src/ch3/10.jpg?raw=true"
style={{ display: 'block',margin: '0 auto',width: '50%' }}
/>

图 5.6 对流-扩散方程的演化

现实问题所归结出来的偏微分方程，往往要比上面所举出的三种情况复杂得多，如高维(状态除了与 $x$ 有关之外，还与 $y,z$ 有关)、非齐次(在方程中带有与 $u$ 及 $u$ 的各阶偏导数无关的函数 $f(x, t)$ )、非线性(含有 $u$ 或 $u$ 的偏导数的非线性项，如 $\left(\frac{\partial u}{\partial x}\right)^2$ 等)、方程组(含有多个未知函数的联立的多个方程)等。更有一些方程，在它的一部分区域内是双曲型的，在另一部分是椭圆型的，在两者的分界线上则是抛物型的。如 Tricomi 方程：

$$
y\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} = 0,
$$

在上半平面是椭圆型，在下半平面是双曲型。在空气动力学的跨音速问题中，常遇见这类方程。但对它们进行了适当的限定和处理之后，一般还是可以归结为前述的几种类型之一。下面我们将对典型问题考虑用差分方法来求解。

## §2 扩散方程的差分化

### §2.1 扩散方程的离散

#### 1. 几种扩散方程的定解问题

先给出几种最简单的扩散方程的定解问题的严格叙述。

(1) 扩散方程初值问题：在区域 $D_\infty = \{(x, t) | -\infty < x < \infty, 0 \leqslant t \leqslant T\}$ 上找一个具有所需次可导的函数 $u(x, t)$ ，使之满足：

$$
\begin{cases}
\frac{\partial u}{\partial t} = a\frac{\partial^2 u}{\partial x^2}\ (a > 0),\ -\infty < x < \infty,\ 0 < t \leqslant T, \\
u(x, 0) = \varphi(x),\ -\infty < x < \infty.\tag{5.21}
\end{cases}


$$

这里， $\varphi(x)$ 是满足一定光滑性的一个已知函数(下同)。

(2) 扩散方程初边值问题：这也称为扩散方程的混合问题。下面只给出三种比较典型的，分别称为第一、第二和第三类混合问题，它在给定区域的某段边界上给出的限制条件分别相当于椭圆型方程的齐次的第一、第二和第三类边界条件。

(i) 第一类混合问题：在区域 $D_I = \{(x, t) | 0 \leqslant x \leqslant 1, 0 \leqslant t \leqslant T\}$ 上找一个具有所需次可导的函数 $u(x, t)$ ，使之满足：

$$
\begin{cases}
\frac{\partial u}{\partial t} = a\frac{\partial^2 u}{\partial x^2}\ (a > 0),\ 0 < x < 1,\ 0 < t \leqslant T, \\
u(x, 0) = \varphi(x),\ 0 < x < 1, \\
u(0, t) = u(1, t) = 0,\ 0 \leqslant t \leqslant T. \tag{5.22}
\end{cases}


$$

(ii) 第二类混合问题：在区域 $D_I$ 上找一个具有所需次可导的函数 $u(x, t)$ ，使之满足：

$$
\begin{cases}
\frac{\partial u}{\partial t} = a\frac{\partial^2 u}{\partial x^2}\ (a > 0),\ 0 < x < 1,\ 0 < t \leqslant T, \\
u(x, 0) = \varphi(x),\ 0 < x < 1, \\
u(0, t) = \frac{\partial u(1, t)}{\partial x} = 0,\ 0 \leqslant t \leqslant T. \tag{5.23}
\end{cases}
$$

(iii) 第三类混合问题：在区域$D_I$上找一个具有所需次可导的函数$u(x, t)$，使之满足：

$$
\begin{cases}
\frac{\partial u}{\partial t} = a\frac{\partial^2 u}{\partial x^2}\ (a > 0),\ 0 < x < 1,\ 0 < t \leqslant T, \\
u(x, 0) = \varphi(x),\ 0 < x < 1, \\
u(0, t) = \frac{\partial u(1, t)}{\partial x} + \alpha u(1, t) = 0\ (\alpha > 0),\ 0 \leqslant t \leqslant T.\tag{5.24}
\end{cases}
$$

#### 2. 差分方法求解的过程

用差分方法求解上述问题的过程与第三章中解椭圆方程的过程是完全相同的，可分为区域离散，方程离散和截断误差估计，初边值处理，差分解的存在唯一性、稳定性、收敛性分析，差分方程求解等步骤。下面先以混合问题为例来叙述上述过程。

(1) 区域的离散：设$N$是任一给定的正整数，令 $h = \frac{1}{N}$ 为空间步长，又设 $\tau$ 是任一正数，满足 $\tau < T$ 。作两族分别平行于坐标轴 $x$ 和坐标轴 $t$ 的直线

$$
x = x_i = ih,\ i = 0, 1, 2, \cdots, N,\\
t = t_j = j\tau,\ j = 0, 1, 2, \cdots, m = \left[\frac{T}{\tau}\right]
$$

（ $[x]$ 表示对 $x$ 向下取整），于是这两族直线把区域 $D_I$ 分割成了一个个小矩形(图 5.7)。不同族直线 $x = x_i$ 与 $t = t_j$ 的交点 $(x_i, t_j)$ 称为结点。

在 $x = 0$ ，$x = 1$ 和 $t = 0$ 上的结点称为边界结点（简称为边界点），其余的称为内结点（简称为内点）。我们的任务是找到一个定义在结点上的网函数 $u_i^j$ ，在一定条件下，它是方程定解问题的真解在 $(x_i, t_j)$ 处的值 $u(x_i, t_j)$ 的近似。

<img
src="https://github.com/FEMATHS/cm.femaths.space/blob/main/docs/src/ch3/11.jpg?raw=true"
style={{ display: 'block',margin: '0 auto',width: '50%' }}
/>

图 5.7 区域的剖分

#### (2) 方程的离散

这里采用直接差分法，即用差商代替微商。现考虑在 $(x_i, t_j)$ 处列近似方程，用 $u(x_i, t_j)$ 在 $t$ 方向的**向后差商**来代替 $\frac{\partial u(x_i, t_j)}{\partial t}$ ，而用它在第 $j$ 层（即 $t = t_j$ 上的结点）和 $j + 1$ 层处的二阶中心差商的加权平均来代替 $\frac{\partial^2 u(x_i, t_j)}{\partial x^2}$ ，即得到计算格式：

$$
\begin{align*}
&\frac{u_i^{j+1} - u_i^j}{\tau} - \left[a\theta \frac{u_{i+1}^{j+1} - 2u_i^{j+1} + u_{i-1}^{j+1}}{h^2} + a(1 - \theta) \frac{u_{i+1}^j - 2u_i^j + u_{i-1}^j}{h^2}\right] = 0, \\
&0 \leqslant \theta \leqslant 1. \tag{5.25}
\end{align*}


$$

这样的格式称为**两层加权平均格式**。

若将微分方程的真解 $u(x, t)$ 限制在结点上，显然它并不会满足方程 $(5.25)$ 。但正如前面一再做过的，这时所产生的余项，恰为用差分方程 $(5.25)$ 代替微分方程所产生的**截断误差**。

将方程 $(5.25)$ 中各项用 $u(x, t)$ 在相应结点上的值代替，并在 $(x_i, t_j)$ 处展开成 Taylor 级数，同时利用 $u(x, t)$ 是微分方程的解，则有

$$
\begin{align*}
&\frac{u(x_i, t_{j+1}) - u(x_i, t_j)}{\tau} \\
&= \frac{\partial u}{\partial t}(x_i, t_j) + \frac{\tau}{2} \frac{\partial^2 u}{\partial t^2}(x_i, t_j) + O(\tau^2) \\
&= \frac{\partial u}{\partial t}(x_i, t_j) + \frac{a^2 \tau}{2} \frac{\partial^4 u}{\partial x^4}(x_i, t_j) + O(\tau^2),\tag{5.26}
\end{align*}
$$

$$
\begin{align*}
&\frac{u(x_{i+1}, t_{j+1}) - 2u(x_i, t_{j+1}) + u(x_{i-1}, t_{j+1})}{h^2} \\
&= \frac{\partial^2 u}{\partial x^2}(x_i, t_{j+1}) + \frac{h^2}{12} \frac{\partial^4 u}{\partial x^4}(x_i, t_{j+1}) + O(h^4) \\
&= \left[\frac{\partial^2 u}{\partial x^2}(x_i, t_j) + \tau \frac{\partial}{\partial t} \frac{\partial^2 u}{\partial x^2}(x_i, t_j) + O(\tau^2)\right] \\\tag{5.27}
&\quad + \frac{h^2}{12}\left[\frac{\partial^4 u}{\partial x^4}(x_i, t_j) + \tau \frac{\partial}{\partial t} \frac{\partial^4 u}{\partial x^4}(x_i, t_j) + O(\tau^2)\right] + O(h^4) \\
&= \frac{\partial^2 u}{\partial x^2}(x_i, t_j) + \frac{h^2 + a\tau}{12} \frac{\partial^4 u}{\partial x^4}(x_i, t_j) + O(\tau^2) + O(\tau h^2) + O(h^4),
\end{align*}
$$

$$
\begin{align*}
&\frac{u(x_{i+1}, t_j) - 2u(x_i, t_j) + u(x_{i-1}, t_j)}{h^2} \\
&= \frac{\partial^2 u}{\partial x^2}(x_i, t_j) + \frac{h^2}{12} \frac{\partial^4 u}{\partial x^4}(x_i, t_j) + O(h^4).
\end{align*}
\tag{5.28}
$$

将 $(5.27)$ 式乘上 $(-a\theta)$ ，将 $(5.28)$ 式乘上 $(-a(1 - \theta))$ ，再与 $(5.26)$ 式的等式两边分别相加，记 $R_i^j(\theta)$ 为这一点的**局部截断误差**（以下简称为截断误差），便有

$$
\begin{align*}
R_i^j(\theta) &= a\left[a\tau \left(\frac{1}{2} - \theta\right) - \frac{h^2}{12}\right] \frac{\partial^4 u}{\partial x^4}(x_i, t_j) \\
&\quad + O(\tau^2) + O(\tau h^2) + O(h^4).\tag{5.29}
\end{align*}
$$

微分方程还可用其他方式离散，如用 $u(x_i, t_j)$ 关于 $t$ 的一阶中心差商代替 $\frac{\partial^2 u}{\partial x^2}$ ，而用它在第 $j$ 层上关于 $x$ 的二阶中心差商代替 $\frac{\partial^2 u}{\partial x^2}$ ，即得到著名的 Richardson 格式：

$$
\frac{u_i^{j+1} - u_i^{j-1}}{2\tau} - a\frac{u_{i+1}^j - 2u_i^j + u_{i-1}^j}{h^2} = 0. \tag{5.30}
$$

这是一个三层格式，易知它的截断误差为

$$
R_i^j = \frac{\tau^2}{6} \frac{\partial^3 u}{\partial t^3}(x_i, t_j) - \frac{ah^2}{12} \frac{\partial^4 u}{\partial x^4}(x_i, t_j) + O(\tau^2) + O(h^4).
$$

(3) 初始条件的离散：以下假定 $\varphi(x)$ 在结点 $\{x_i\}_{i=0}^{N-1}$ 处有定义，故没有定义的 $u_i^0 = \varphi(x_i) \triangleq \varphi_i(i = 1, 2, \cdots, N - 1)$（对于 $\varphi(x)$ 在某些结点书中不定义的情况，可采用插值、Fourier 展开或其他方法来补充定义，本书不再讨论这种情况）。

(4) 边界条件的离散：

- (i) 第一类混合问题边界条件的离散：只要取 $u_0^j = u_N^j = 0\ (j = 0, 1, 2, \cdots, m)$ 就可以了。
- (ii) 第二类混合问题边界条件的离散：在左边界 $x = 0$ 处可与(i)同样处理，而在右边界 $x = 1$ 处，用一阶向前差商代替微分，得到

$$
u_N^j - u_{N-1}^j = 0\ (j = 0, 1, 2, \cdots, m). \tag{5.32}
$$

- (iii) 第三类混合问题边界条件的离散：在左边界 $x = 0$ 处亦与(i)同样处理，而在右边界 $x = 1$ 处，仿照(ii)，即有

$$
\frac{u_N^j - u_{N-1}^j}{h} + \alpha u_N^j = 0.
$$

或写成

$$
(1 + \alpha h)u_N^j - u_{N-1}^j = 0,\ (j = 0, 1, 2, \cdots, m). \tag{5.33}
$$

## §2.2 计算格式示例

以下讨论一般都以第一类混合问题为对象，其方法和结论不难平行地推广到其他类型的混合问题中去。

这里先列举出一些差分格式，为简单起见，除了第一个格式外，将不再列出边界点的处理。

记 $r = \frac{a\tau}{h^2}$ 为一个预先设定的常数，称为网比。网比确定之后， $\tau$ 和 $h$ 便不能各自随心所欲地变动了，而只能在保持 $r$ 不变的情况下联动变化。

利用 $r$ ，并将结点值按层次分开，方程 $(5.25)$ 可写成：

$$
u_i^{j+1} = r(1 - \theta)u_{i+1}^j + (1 - 2r(1 - \theta))u_i^j + r(1 - \theta)u_{i-1}^j + r\theta u_{i+1}^{j+1} + (1 - 2r\theta)u_i^{j+1} + r\theta u_{i-1}^{j+1}. \tag{5.34}
$$

### 1. 古典显格式

在方程 $(5.34)$ 中取 $\theta = 0$ ，即得

$$
\begin{cases}
u_i^{j+1} = ru_{i+1}^j + (1 - 2r)u_i^j + ru_{i-1}^j,\quad i = 1, 2, \cdots, N - 1,\ j = 0, 1, 2, \cdots, m - 1,\\
u_i^0 = \varphi(x_i) = \varphi_i,\ i = 1, 2, \cdots, N - 1,
u_0^j = u_N^j = 0,\ j = 0, 1, 2, \cdots, m \tag{5.35}
\end{cases}
$$

用记号 $\otimes$ 表示列差分方程时所考虑的那个结点， $\times$ 表示其相邻的结点，实线表示 $x$ 方向的差分，虚线表示 $t$ 方向的差分，则古典显格式可形象地简表示如图 5.8。

<img
src="https://github.com/FEMATHS/cm.femaths.space/blob/main/docs/src/ch3/12.jpg?raw=true"
style={{ display: 'block',margin: '0 auto',width: '50%' }}
/>

图 5.8 古典显格式

由 $(5.29)$ 式，其截断误差为 $R_i^j(\theta) = O(\tau + h^2)$ 。

格式 $(5.35)$ 的计算过程如下：

先在 $(5.35)$ 式中令 $j = 0$ ，由于 $u_i^0 = \varphi_i$ 是已知的，则由 $u_{i-1}^0,u_i^0,u^0_{i+1}$ 即可算得 $u_i^1(i = 1, 2, \cdots, N - 1)$ 。又由于 $u_0^1, u_N^1$ 是已知的，则由 $u_{i-1}^1, u_i^1, u_{i+1}^1$ 可算得 $u_i^2(i = 1, 2, \cdots, N - 1)$ 。再利用第二层的数值去算第 3 层……。这样一层层算上去，直到算出第 $m$ 层。

在计算第 $j + 1$ 层时，只要对第 $j$ 层上的已知值作运算，而并不需要解方程，因而称之为“显格式”。

### 2. 古典隐格式

在方程 $(5.34)$ 中令 $\theta = 1$ ，即得

$$
\begin{cases}
-ru_{i+1}^{j+1} + (1 + 2r)u_i^{j+1} - ru_{i-1}^{j+1} = u_i^j, \\
i = 1, 2, \cdots, N - 1, \\
j = 0, 1, \cdots, m - 1. \tag{5.36}
\end{cases}
$$

<img
src="https://github.com/FEMATHS/cm.femaths.space/blob/main/docs/src/ch3/13.jpg?raw=true"
style={{ display: 'block',margin: '0 auto',width: '50%' }}
/>

图 5.9 古典隐格式

它所用的结点可以图表示出来(图 5.9)，其截断误差的阶与古典显格式是相同的：

$$
R_i^j(1) = O(\tau + h^2).
$$

格式 $(5.36)$ 的计算过程如下：

首先在 $(5.36)$ 式中令 $j = 0$ ，并把已知的初始条件和边界条件代入，得到一组关于 $u_1^1, u_2^1, \cdots, u_{N-1}^1$ 的线性方程组：

$$
\begin{bmatrix}
1 + 2r & -r \\
-r & 1 + 2r & -r \\
& -r & \ddots & \ddots \\
& & -r & 1 + 2r
\end{bmatrix}
\begin{bmatrix}
u_1^1 \\
u_2^1 \\
\vdots \\
u_{N-1}^1
\end{bmatrix}
=
\begin{bmatrix}
u_1^0 \\
u_2^0 \\
\vdots \\
u_{N-1}^0
\end{bmatrix}
\quad
(即\quad
\begin{bmatrix}
\varphi_1 \\
\varphi_2 \\
\vdots \\
\varphi_{N-1}
\end{bmatrix}
)
\tag{5.37}
$$

因而需要解一个系数矩阵为对称正定的三对角方程来求出第一层上的近似值。

接着，令 $j = 1$ ，又可以得到一个关于第二层上数据的线性方程组。它的形式与 $(5.37)$ 式完全一样，只是左右边上列向量的上标分别变成了 2 和 1。利用已经求得的第一层上的数据，再解一次方程组，就求出了第二层上的近似值。这样逐层求解，一直到算出第$m$层上的近似值为止。

在现在讨论的情况中，所有层数的方程组的系数矩阵都是相同的。所以，可以在一开始先将它作一个 Cholesky 分解后存贮起来，以后每一层要用时就可减少工作量。

像这样在求第 $j + 1$ 层时需要解方程的差分方法被称为“隐格式”。

### 3. Crank-Nicholson 格式

在方程(5.34)中令$\theta = \frac{1}{2}$，即得

$$
\begin{cases}
-\frac{r}{2}u_{i+1}^{j+1} + (1 + r)u_i^{j+1} - \frac{r}{2}u_{i-1}^{j+1} \\
\quad = \frac{r}{2}u_{i+1}^j + (1 - r)u_i^j + \frac{r}{2}u_{i-1}^j, \\
i = 1, 2, \cdots, N - 1, \\
j = 0, 1, \cdots, m - 1. \tag{5.38}
\end{cases}


$$

这个格式所用的结点如图 5.10 所示。

<img
src="https://github.com/FEMATHS/cm.femaths.space/blob/main/docs/src/ch3/14.jpg?raw=true"
style={{ display: 'block',margin: '0 auto',width: '50%' }}
/>

图 5.10 Crank-Nicholson 格式

各层右边的数字“$\frac{1}{2}$”表示相应的权重。由于该格式对$\frac{\partial^2 u}{\partial x^2}$的近似是取两层关于$x$的二阶中心差商的算术平均，所以一般被称为六点对称格式。

在(5.29)中令$\theta = \frac{1}{2}$，即知六点对称格式的截断误差为
$$R_i^j\left(\frac{1}{2}\right) = O(\tau^2 + h^2)$$

**六点对称格式**显然是个隐格式，在由第$j$层数据求第$j + 1$层时要解方程，其系数矩阵对称正定，整个求解过程与古典隐格式相同，这里不再详述。

## 算例

### Example 1

对定解问题：

$$
\begin{cases}
\frac{\partial u}{\partial t} = \frac{\partial^2 u}{\partial x^2}, & x \in (0,1), t \in (0,T], \\
u(0,t) = u(1,t) = 0, & t \in (0,T], \\
u(x,0) = 0, & x \in (0,1).
\end{cases}
$$

若在 $u\left(\frac{1}{2}, 0\right)$ 处有一个扰动 $\frac{1}{2^{10}}$, 取 $h=\frac{1}{16}$, $r=\frac{1}{2}$, 分别用古典显格式、古典隐格式和六点对称格式计算 8 层:

- 打印出第 8 层上各结点处的计算值;
- 预测继续算下去计算值的变化趋势;
- 分析上述趋势产生的原因。

我们实现了相关代码放在了 Github 上，可见[https://github.com/FEMATHS/Example/tree/main/ch3/section2/example1](https://github.com/FEMATHS/Example/tree/main/ch3/section2/example1),效果如下：

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch3/section2/example1/Explicit_FTCS.png?raw=true"
      alt="Gear方法收敛性分析"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 1：显式格式计算第八层
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch3/section2/example1/Err_Explicit.png?raw=truee"
      alt="三种方法4阶收敛性比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 2：显式格式计算第八层的误差
    </figcaption>
  </figure>
</div>

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch3/section2/example1/Implicit_BTCS.png?raw=true"
      alt="Gear方法收敛性分析"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 3：隐式格式计算第八层
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch3/section2/example1/Err_Implicit.png?raw=truee"
      alt="三种方法4阶收敛性比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 4：隐式格式计算第八层的误差
    </figcaption>
  </figure>
</div>

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch3/section2/example1/Crank_Nicolson.png?raw=true"
      alt="Gear方法收敛性分析"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 5：Crank–Nicolson格式计算第八层
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch3/section2/example1/Err_CN.png?raw=truee"
      alt="三种方法4阶收敛性比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 6：Crank–Nicolson格式计算第八层的误差
    </figcaption>
  </figure>
</div>

为进一步说明例子，我还做了几张热力图说明问题：

<img
src="https://cdn.jsdelivr.net/gh/FEMATHS/Example/ch3/section2/example1/diffusion_curves.gif"
style={{ display: 'block', margin: '0 auto', width: '100%' }}
alt="Diffusion Curves"
/>

图 7 三种格式（显式格式、隐式格式、Crank–Nicolson 格式） 的比较

<img
src="https://cdn.jsdelivr.net/gh/FEMATHS/Example/ch3/section2/example1/diffusion_comparison.gif"
style={{ display: 'block', margin: '0 auto', width: '100%' }}
alt="Diffusion Curves"
/>

图 8 三种格式（显式格式、隐式格式、Crank–Nicolson 格式） 的热力图比较

<img
src="https://cdn.jsdelivr.net/gh/FEMATHS/Example/ch3/section2/example1/diffusion_long_explicit.gif"
style={{ display: 'block', margin: '0 auto', width: '100%' }}
alt="Diffusion Curves"
/>

图 9 显式格式热力图

<img
src="https://cdn.jsdelivr.net/gh/FEMATHS/Example/ch3/section2/example1/diffusion_long_implicit.gif"
style={{ display: 'block', margin: '0 auto', width: '100%' }}
alt="Diffusion Curves"
/>

图 10 隐式格式热力图

<img
src="https://cdn.jsdelivr.net/gh/FEMATHS/Example/ch3/section2/example1/diffusion_long_crank_nicolson.gif"
style={{ display: 'block', margin: '0 auto', width: '100%' }}
alt="Diffusion Curves"
/>

图 11 Crank–Nicolson 格式热力图

<DiffusionSolver />
