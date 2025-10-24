# 椭圆型方程的有限元解法

第六章中把几种典型的微分方程边值问题（包括不同类型的边界条件）化成了等价的变分问题或求泛函的极值问题，并介绍了用 Ritz - Galerkin 方法求解的思想和过程。但正如在最后一节中所指出的，这个方法存在着坐标函数选取技术、计算量大等缺点，因而不能获得广泛的使用。
数学在当代由工程技术人员发展起来，并在 60 年代末 70 年代初由数学家奠定严格的数学基础的**有限元方法**是克服上述困难的一种行之有效的计算方法，目前它已在结构力学、弹性力学、流体力学等方面得到了极大范围的使用。
本章将介绍用有限元方法求解椭圆型方程的一些基本思想、方法和过程，限于篇幅，本书将不涉及抛物型方程和双曲型方程的有限元解法，它们的基本思路是类似的。
本章中将用字母$C$（可带足标）来表示正常数，这些常数不依赖问题的真解、近似解和$h$（$h$是与空间剖分有关的一个量），并且有时用同一个$C$（带或不带足标）在不同的场合代表不同的常数，请读者阅读时加以注意。

## 基于变分问题的有限元方法

这里以问题

$$
\begin{cases}
-\frac{d}{dx}\left(p\frac{du}{dx}\right) + ru = f, & x \in I, \\
u(0) = 0, \quad \frac{du(1)}{dx} + au(1) = 0
\end{cases}
\tag{7.1}
$$

为例，介绍如何用有限元法求两点边值问题的近似解。

用有限元方法找问题$(7.1)$的近似解的过程可以分为六步。

Step1：将数学物理问题化为等价的变分问题。这一步已由第六章解决了，这里不再重复。为方便起见，将与问题$(7.1)$对应的变分问题再抄录一遍：

在$Q_E^1(\bar{I})$中找一个函数$u^*$，使满足：

$$
a(u^*, v) = f(v), \quad \forall v \in Q_E^1(\bar{I}),\tag{7.2}
$$

其中

$$
\bar{I} = [0, 1];
$$

$$
a(u, v) = \int_0^1 \left[p\frac{du}{dx}\frac{dv}{dx} + ru v\right]dx + p(1)au(1)v(1);\tag{7.3}
$$

$$
f(v) = \int_0^1 fv dx;\tag{7.4}
$$

$$
Q_E^1(\bar{I}) = \{u \mid u \in Q^1(\bar{I}), u(0) = 0\}.
\tag{7.5}
$$

关于$Q^1(\bar{I})$的定义见第六章，而函数$p, r, f$和常数$a$满足定理 6.1 的条件，可知解是存在的，但不属于本书讨论范围。

第二步，对求解区域进行剖分。

问题$(7.1)$是在区间$\bar{I} = [0, 1]$上求解，因而对区间的剖分是简单的。用$I$中满足：

$$
0 = x_0 < x_1 < x_2 < \cdots < x_n < x_{n+1} = 1
$$

的$n$个结点$x_i(i = 1, 2, \cdots, n)$将区间$I$分割成$n + 1$个互不包含的子区间：

$$
I_i = [x_{i-1}, x_i] \quad (i = 1, 2, \cdots, n + 1),
$$

每一个$I_i$称为单元。记

$$
h_i = x_i - x_{i-1} \quad (i = 1, 2, \cdots, n + 1),
$$

并记

$$
h = max_{1\le i \le n+1} h_i.
$$

Step3：形成单元上的形状函数。

通常将单元上的形状函数取为多项式。

我们知道,一个单变量的$k$次多项式需$k + 1$个条件才能确定,所以,要将$I$中的$n + 1$个单元上的形状函数都确定,需要$(n + 1)(k + 1)$个条件。特别地,当选取的形状函数为线性函数,即为一次多项式时,共需要$2(n + 1)$个条件。

Step4：由形状函数构成试探函数空间$V_h$。

试探函数空间$V_h$应满足如下要求:

- (i) 问题$(7.1)$(即变分问题$(7.2)$)的近似解$u_h$将在$V_h$中寻找。
- (ii) 把$V_h$中的任一个函数$u_h$限制在$I_i$($i = 1, 2, \cdots, n + 1$)上时,它是$I_i$上的一个形状函数。
- (iii) $V_h$中的函数应满足一定的光滑性,至少应对任何函数$u_h, v_h \in V_h$,$a(u_h, v_h)$和$f(v_h)$有意义。例如,取$V_h$为$C_0^1$的一个子空间(光滑性的要求也可以提得更高一些,但此时将造成构造上的困难)。

对问题$(7.1)$,可根据以上要求构造试探函数空间:$V_h = \{u_h | u_h \in C^1(\bar{I}), u_h 限制在I_i上是k次多项式, u_h(0) = 0\}$。要唯一确定$V_h$中的一个函数需要设置$(n + 1)(k + 1)$个条件。由于$u_h \in C^1(\bar{I})$,即$u_h$在$x = x_i$处连续($i = 1, 2, \cdots, n$)且$u_h(0) = 0$,这共有$n + 1$个限制条件,所以总共需设置$(n + 1)(k + 1) - n = (n + 1)k + 1$个条件,当$k = 1$时,需要设置$n + 2$个条件。

由于剖分时共设置了$n + 2$个结点$x_0, x_1, \cdots, x_n, x_{n+1}$,除了$u_h(x_0) = 0$外,还留下了$n + 1$个结点$x_1, x_2, \cdots, x_n, x_{n+1}$,当$k = 1$时,这些结点的个数与需设置的条件个数正好相等,因此很自然地会想到,把所要设置的条件放到结点$x = x_i$($i = 1, 2, \cdots, n + 1$)上。

**定理 7.1** 设$u_h(x)$是$V_h^{(1)}$上的一个函数,那么$u_h = u_h(x)$在$V_h^{(1)}$中存在唯一函数$u_h(x)$,满足:
$$u_h(x_i) = u_i \quad (i = 1, 2, \cdots, n + 1),$$
反之,给定了$n + 1$个数$\{u_i\}_{i=1}^{n+1}$,

$$
u_h(x) = \begin{cases}
u_1 \frac{x}{h_1}, & x \in [0, x_1], \\
u_{i-1} \frac{x_i - x}{h_i} + u_i \frac{x - x_{i-1}}{h_i}, & x \in [x_{i-1}, x_i], \quad i = 2, 3, \cdots, n + 1, \\
\end{cases}
\tag{7.7}
$$

显然,$u_h(x) \in V_h^{(1)}$,且$u_h(x)$的唯一性也是显然的。

图 7.1 是相应$(7.7)$式的函数图形。

**定理 7.1** 说明$V_h^{(1)}$中的函数全体$\{u_h\}$与$n + 1$维 Euclid 空间中的点全体$\{(u_1, u_2, \cdots, u_{n+1})\}$构成一个一一对应,因此$V_h^{(1)}$也是一个$n + 1$维线性空间。

记$V_h^{(1)}$中与$\{e_i\}_{i=1}^{n+1}$对应的一组基为$\{\varphi_i\}_{i=1}^{n+1}$(这里$e_i$是$\mathbb{R}^{n+1}$中的自然基,即$e_i = (0, 0, \cdots, 0, 1, 0, 0, \cdots, 0)$,$i = 1, 2, \cdots, n$),按照$(7.7)$式的对应关系,即有

$$
\varphi_i(x) = \begin{cases}
\frac{x - x_{i-1}}{h_i}, & x \in [x_{i-1}, x_i], \\
\frac{x_{i+1} - x}{h_{i+1}}, & x \in [x_i, x_{i+1}], \\
0, & \text{在别处};
\end{cases}
\tag{7.6}
$$

$$u_h(x) = u_i.$$

证明 定理前半部分是显然的。

根据$(7.6)$式,构造函数如下:

$$
u_h(x) = \begin{cases}
u_1 \frac{x}{h_1}, & x \in [0, x_1], \\
u_{i-1} \frac{x_i - x}{h_i} + u_i \frac{x - x_{i-1}}{h_i}, & x \in [x_{i-1}, x_i], \quad i = 2, 3, \cdots, n + 1, \\
\end{cases}
\tag{7.7}
$$

图 7.1 是相应$(7.7)$式的函数图形。

<img
src="https://github.com/FEMATHS/cm.femaths.space/blob/main/docs/src/ch4/1.jpg?raw=true"
style={{ display: 'block',margin: '0 auto',width: '50%' }}
/>

图 7.1 是相应$(7.7)$式的函数图形。

**定理 7.1** 说明 $V_h^{(1)}$ 中的函数全体 $\{u_h\}$ 与 $n + 1$ 维 Euclid 空间中的点全体 $\{(u_1, u_2, \cdots, u_{n+1})^T\}$ 构成一个一一对应，因此 $V_h^{(1)}$ 也是一个 $n + 1$ 维线性空间。

记 $V_h^{(1)}$ 中与 $\{e_i\}_{i=1}^{n+1}$ 对应的一组基为 $\{\varphi_i\}_{i=1}^{n+1}$，这里 $\{e_i\}$ 是 $\mathbb{R}^{n+1}$ 中的自然基，即 $e_i = (\underbrace{0, 0, \cdots, 0}_{i-1个}, 1, 0, 0, \cdots, 0)^T$，按照 (7.7) 式的对应关系，即有 $(i = 1, 2, \cdots, n)$

$$
\varphi_i(x) = \begin{cases}
\frac{x - x_{i-1}}{h_i}, & x \in [x_{i-1}, x_i], \\
\frac{x_{i+1} - x}{h_{i+1}}, & x \in [x_i, x_{i+1}], \\
0, & \text{在别处};
\end{cases}
$$

$$
\varphi_{n+1}(x) = \begin{cases}
\frac{x - x_n}{h_{n+1}}, & x \in [x_n, x_{n+1}], \\
0, & \text{在别处}。
\end{cases}
$$

这组基中每一个基函数的形状由图 7.2 给出。

<img
src="https://github.com/FEMATHS/cm.femaths.space/blob/main/docs/src/ch4/2.jpg?raw=true"
style={{ display: 'block',margin: '0 auto',width: '50%' }}
/>

图 7.2 $V_h^{(1)}$中与$\{e_i\}_{i=1}^{n+1}$对应的基函数$\varphi_i(x)$（$1 \leq i \leq n$）的形状

于是满足(7.9)式的函数$u_h$可以用这组基表示为

$$
u_h(x) = \sum_{i=1}^{n+1} u_i \varphi_i(x)。
$$

Step5：导出有限元方程。

根据(7.2)式确定$u^*$一般说来是做不到的，因为此时其自由度数个数等于无穷大。有了试探函数空间$V_h$，就可以用一个近似问题代替原来的变分问题$P$。

变分问题$P_h$：在$V_h^{(1)}$中找一个$u_h^*$，使满足：

$$
a(u_h^*, v_h) = f(v_h), \quad \forall v_h \in V_h^{(1)}。
\tag{7.8}
$$

由变分问题$P_h$找到的解$u_h^*$称为变分问题$P$（也即问题(7.1)）在空间$V_h^{(1)}$中的近似解。

下面我们讨论$k = 1$的情况。

显然，(7.8)式等价于

$$
a(u_h^*, \varphi_j) = f(\varphi_j), \quad j = 1, 2, \cdots, n + 1。
\tag{7.9}
$$

用$u_h^*$表示$u_h^*(x)$，便有

$$
u_h^* = \sum_{i=1}^{n+1} u_i^* \varphi_i(x)。
\tag{7.10}
$$

代入(7.9)式，得到

$$
\sum_{i=1}^{n+1} a(\varphi_i, \varphi_j) u_i^* = f(\varphi_j), \quad j = 1, 2, \cdots, n + 1,
$$

或写成矩阵形式：

$$
A u^* = f,
\tag{7.11}
$$

这里

$$
A = (a(\varphi_i, \varphi_j))_{(n+1) \times (n+1)},
$$

$$
u^* = (u_1^*, u_2^*, \cdots, u_{n+1}^*)^T,
$$

$$
f = (f(\varphi_1), f(\varphi_2), \cdots, f(\varphi_{n+1}))^T。
$$

由(7.3)式和(7.4)式，有

$$
a(\varphi_i, \varphi_j) = \int_0^1 \left[p \frac{d\varphi_i}{dx} \frac{d\varphi_j}{dx} + r \varphi_i \varphi_j\right] dx + p(1) a \varphi_i(1) \varphi_j(1),
\tag{7.12}
$$

$$
f(\varphi_j) = \int_0^1 f \varphi_j dx。
\tag{7.13}
$$

初看起来，由(7.11)式、(7.12)式、(7.13)式决定的线性方程组的形式与 Ritz-Galerkin 方法得到的完全一样，但实际上它们之间的差别非常大。由$\varphi_i(x)$的表达式易知：

$$
\begin{cases}
\varphi_i \varphi_j = 0, \\
\text{当}|i - j| > 1,
\end{cases}
$$

因此$a(\varphi_i, \varphi_j) = 0 (|i - j| > 1)$。也就是说，(7.11)式中的系数矩阵$A$是一个对称三对角矩阵，形成$A$只需要计算$2n + 1$个$a(\varphi_i, \varphi_j)$，所以比 Ritz 法大大地减少了工作量。

由于$\varphi_j$不为零的区间仅为$[x_{j-1}, x_j]$（当$j = i - 1$时）或 $[x_{i-1}, x_{i+1}]$（当$j = i$时），而且$\varphi_j(1) = 0$（$\forall j \neq n + 1$），因此(7.12)、(7.13)式可写成

$$
a(\varphi_i, \varphi_{i-1}) = \frac{1}{h_i} \int_{x_{i-1}}^{x_i} \left[-p(x) + r(x)(x - x_{i-1})(x - x_i)\right] dx, \quad i = 2, 3, \cdots, n + 1;
\tag{7.14}
$$

$$
f(\varphi_i) = \int_{x_{i-1}}^{x_i} f(x) \frac{x - x_{i-1}}{h_i} dx + \int_{x_i}^{x_{i+1}} f(x) \frac{x_{i+1} - x}{h_{i+1}} dx, \quad i = 1, 2, \cdots, n;
\tag{7.15}
$$

$$
f(\varphi_{n+1}) = \int_{x_n}^{x_{n+1}} f(x) \frac{x - x_n}{h_{n+1}} dx;
$$

$$
a(\varphi_i, \varphi_i) = \frac{1}{h_{i-1}} \int_{x_{i-1}}^{x_i} \left[p(x) + r(x)(x - x_{i-1})^2\right] dx + \frac{1}{h_i} \int_{x_i}^{x_{i+1}} \left[p(x) + r(x)(x_{i+1} - x)^2\right] dx, \quad i = 1, 2, \cdots, n;
\tag{7.16}
$$

$$
a(\varphi_{n+1}, \varphi_{n+1}) = \frac{1}{h_{n+1}} \int_{x_n}^{x_{n+1}} \left[p(x) + r(x)(x - x_n)^2\right] dx + p(1)a。
$$

一般说来，要精确得到公式(7.14)～(7.16)所确定的$a(\varphi_i, \varphi_j)$及$f(\varphi_j)$是不可能的，必须对它们采用数值积分的方法。从(7.14)～(7.16)式可以看到，对不同的$i$和$j$，所对应的积分区间是不同的，这样的表达形式不利于数值积分公式的使用，下面要把它们转化到同一个区间上去积分。

仿射变换

$$
\xi = \frac{x - x_{i-1}}{h_i}
\tag{7.17}
$$

将区间$[x_{i-1}, x_i]$映照成$[0, 1]$。对(7.14)～(7.16)式利用(7.17)式便得到实际使用的公式：

$$
a(\varphi_i, \varphi_{i-1}) = \int_0^1 \left[-\frac{p(x_{i-1} + h_i \xi)}{h_i} + h_i^2 r(x_{i-1} + h_i \xi)\xi(1 - \xi)\right] d\xi, \quad i = 2, 3, \cdots, n + 1;
\tag{7.18}
$$

$$
f(\varphi_i) = \int_0^1 f(x_{i-1} + h_i \xi)h_i \xi d\xi + \int_0^1 f(x_i + h_{i+1} \xi)h_{i+1}(1 - \xi) d\xi, \quad i = 1, 2, \cdots, n;
\tag{7.19}
$$

$$
f(\varphi_{n+1}) = \int_0^1 f(x_n + h_{n+1} \xi)h_{n+1} \xi d\xi;
$$

$$
a(\varphi_i, \varphi_i) = \int_0^1 \left[\frac{p(x_{i-1} + h_i \xi)}{h_i} + h_i^2 r(x_{i-1} + h_i \xi)\xi^2\right] d\xi + \int_0^1 \left[\frac{p(x_i + h_{i+1} \xi)}{h_{i+1}} + h_{i+1}^2 r(x_i + h_{i+1} \xi)(1 - \xi)^2\right] d\xi, \quad i = 1, 2, \cdots, n;
\tag{7.20}
$$

$$
a(\varphi_{n+1}, \varphi_{n+1}) = \int_0^1 \left[\frac{p(x_n + h_{n+1} \xi)}{h_{n+1}} + h_{n+1}^2 r(x_n + h_{n+1} \xi)\xi^2\right] d\xi + p(1)a。
$$

这样，只要选取某个适用于$[0, 1]$区间的数值求积公式

$$
\int_0^1 f(x)dx \approx \sum_{k=1}^m \omega_k f(x_k)
$$

（这里$\omega_k$是权，$x_k$是$[0, 1]$中的积分结点），就可以对所有的$a(\varphi_i, \varphi_j)$和$f(\varphi_j)$进行统一处理。

第六步，解线性代数方程组。

在利用数值积分得到方程组(7.11)后，再用数值代数方法解出

$$
u^* = (u_1^*, u_2^*, \cdots, u_{n+1}^*)^T,
$$

则

$$
u_h^* = \sum_{i=1}^{n+1} u_i^* \varphi_i(x)
$$

就是原问题(7.1)的近似解。

上面第一步到第六步就是用有限元方法求与两点边值问题对应的变分问题近似解的过程。
