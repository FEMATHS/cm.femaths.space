# 差分法解边值问题

有限差分法（Finite Difference Method，FDM）是一种求解微分方程数值解的近似方法，其主要原理是对微分方程中的微分项进行直接差分近似，从而将微分方程转化为代数方程组求解。有限差分法和有限元法是求微分方程近似解的两种重要的数值方法，它们的**共同特点**是**将连续的问题和区域进行各种形式的离散，最后化为有限形式的线性代数方程组**。有限差分法与有限元法的**最大区别**在于前者的处理直接施加于所给的微分方程本身，而后者则需要先把微分方程化成其他形式的数学问题再加以处理。它们的共同点决定了这两种方法在总的处理思路和大的步骤上有不少相同或类似之处，而它们的不同点又导致了这两种方法的具体操作实施具有无法比拟的各自的特殊性。

先从比较简单的两点边值问题的差分法讲起。

## 解两点边值问题的差分方法

考虑最简单的常微分方程边值问题

$$
{\rm L} u \equiv-\frac{\mathrm{d}^{2} u}{\mathrm{~d} x^{2}}+q u=f, \quad x \in(a, b), \tag{1}
$$

$$
u(a)=\alpha_{0}, u^{\prime}(b)+\beta u(b)=\alpha_{1},\tag{2}
$$

其中, $q, f \in C^{0}([a, b]), q \geqslant 0, \alpha_{0}, \alpha_{1}, \beta$ 为给定常数 $(\beta>0)$ 。(1)式中 $\rm L$ 为微分算子（ $\rm L$ 用白正体字母表示，今后同）。

用差分法求解边值问题(1)的过程可以分成 5 步。本小节先讨论前三步，其后的两步不太相同。

第一步，区域的离散

将区间 $[a, b]$ 分成 $N$ 等分，分点为

$$
x_{i}=a+i h, \quad i=0,1, \cdots, N,
$$

这里,$h=\frac{b-a}{N}, x_{i}$ 被称为网格上的结点，$h$ 称为步长。
第二步，微分方程离散。
由 Taylor 展开公式，在结点 $x_{i}$ 处，成立

$$
\begin{array}{c}
u^{\prime \prime}\left(x_{i}\right)=\frac{1}{h^{2}}\left[u\left(x_{i+1}\right)-2 u\left(x_{i}\right)+u\left(x_{i-1}\right)\right]-\frac{h^{2}}{12} u^{(4)}\left(\xi_{i}\right) \\
x_{i-1} \leqslant \xi_{i} \leqslant x_{i+1}.\tag{3}
\end{array}
$$

记余项

$$
R_{i}(u)=-\frac{h^{2}}{12} u^{(t)}\left(\xi_{i}\right),\tag{4}
$$

则在 $x_{i}$ 处可将方程(1)写成

$$
-\frac{u\left(x_{i+1}\right)-2 u\left(x_{i}\right)+u\left(x_{i-1}\right)}{h^{2}}+q\left(x_{i}\right) u\left(x_{i}\right)=f\left(x_{i}\right)+R_{i},\tag{5}
$$

舍去余项，便得到逼近方程(1)的差分方程：

$$
\begin{array}{r}
L_{\mathrm{h}} u_{i} \equiv-\frac{u_{i+1}-2 u_{i}+u_{i-1}}{h^{2}}+q_{i} u_{i}=f_{i}, \\
i=1,2, \cdots, N=1,\tag{6}
\end{array}
$$

其中, $q_{i}=q\left(x_{i}\right), f_{i}=f\left(x_{i}\right)$ ,而 $u_{i}$ 是 $u(x)$ 在 $x_{i}$ 处的近似值，也就是所要寻找的差分解。(6)式中 $\mathrm{L}_{\mathrm{h}}$ 为差分算子（ $\mathrm{L}_{\mathrm{h}}$ 用白正体字母表示，今后同）。

利用差分算子 $\mathrm{L}_{\mathrm{h}}$ ,(5)可写成：

$$
{\rm L_{h}} u\left(x_{i}\right)=f\left(x_{i}\right)+R_{i},
$$

所以, $ R*{i} $ 就是差分算子 $\mathrm{L}*{\mathrm{h}}$ 代替微分算子 $\rm L$ 所引起的截断误差，它的阶是 $O\left(h^{2}\right)$ 。

第三步，边界条件的处理。
在(6)式中出现了 $N+1$ 个未知量 $u_{0}, u_{1}, \cdots, u_{N-1}, u_{N}$ ，但只有 N-1 个方程，所缺的两个方程可以通过对边界条件的处理来获得。

**对于第一类边界条件**，如在左端 $x=a$ 处，只要直接将函数值代入就行了，即取

$$
u_{0}=u(a)=\alpha_{0}
$$

**对于第三类边界条件**，如在右端 $x=b$ 处，就需要处理 $u(x)$ 的导数值。容易想到的是取它的一阶差商，如取

$$
u^{\prime}(b) \approx \frac{u_{N}-u_{N-1}}{h},
$$

但这样做将使得边界点上的截断误差(为 $O(h)$ )低于内点的截断误差；而由于 $x_{N}$ 是端点，又不能采取具有 $O\left(h^{2}\right)$ 精度的中心差分，所以在实际中常常采用二阶 Gear 公式。由前面章节，有

$$
u(x+2 h)-\frac{4}{3} u(x+h)+\frac{1}{3} u(x)=\frac{2 h}{3} u^{\prime}(x+2 h)+O\left(h^{2}\right) .\tag{7}
$$

令 $x+2 h=x\_{N}$ ，舍去余项，即有近似式：

$$
u^{\prime}(b) \approx \frac{1}{2 h}\left(3 u_{N}-4 u_{N-1}+u_{N-2}\right),
$$

于是，(2)式的后一个条件可处理成

$$
\frac{1}{2 h}\left(3 u_{N}-4 u_{N-1}+u_{N-2}\right)+\beta u_{N}=\alpha_1.\tag{8}
$$

区间的剖分和边界条件的处理可采取多种多样的形式。比如，若 $u(x)$ 能够被光滑地延拓到区间 $[a, b]$ 之外，则可取分点

$$
x\_{j}=a+\left(j-\frac{1}{2}\right) h, \quad j=0,1,2, \cdots, N,\tag{9}
$$

其中 $h=\frac{b-a}{N-1}$ ，这时分点 $x_{0}=a-\frac{h}{2}$ 和 $x_{N}=b+\frac{N}{2}$ 将在 $[a, b]$ 之外。

对于结点 $x_{0}, x_{1}, \cdots, x_{N}$ ，同样可以列出（3．6）式所示的 $N-1$ 个方程，不足的两个方程可由边界条件来提供。利用

$$
\frac{1}{2}\left[u\left(x_{1}\right)+u\left(x_{0}\right)\right]=u(a)+\frac{h^{2}}{8} u^{\prime \prime}(\xi), \quad x_{0}<\xi<x_{1},
$$

和

$$
u^{\prime}(b)=\frac{1}{h}\left[u\left(x_{N}\right)-u\left(x_{N-1}\right)\right]-\frac{h^{2}}{24} u^{\prime \prime \prime}(\eta), \quad x_{N-1}<\eta<x_{N},
$$

可给出两个方程：

$$
\left\{\begin{array}{l}
u_{1}+u_{0}=2 \alpha_{0}, \\
\frac{1}{h}\left(u_{N}-u_{N-1}\right)+\frac{\beta}{2}\left(u_{N}+u_{N-1}\right)=\alpha_{1} .
\end{array}\right.\tag{10}
$$

将(10)式与(6)式联立就可以得到一个由 $N+1$ 个方程组成的含有 $n+1$ 个未知量的线性方程组，其中每一个方程所略去的余项都是 $O\left(h^{2}\right)$ 。

通常遇到的方程当然要比方程(1)复杂得多，然而不管怎样，导出线性方程组的思想是类似的。如对二阶自共轭方程

$$
-\frac{\mathrm{d}}{\mathrm{~d} x}\left(p \frac{\mathrm{~d} u}{\mathrm{~d} x}\right)+q(x) u(x)=f(x), \quad a<x<b,\tag{11}
$$

其中, $p(x) \in C^{1}([a, b]), p(x) \geqslant p_ {min}>0, q, f \in C^{0}([a, b]) 且 q(x) \geqslant 0$ 。取结点为

$$
a=x_{0}<x_{1}<\cdots<x_{i}<\cdots<x_{N}=b,
$$

记小区间

$$
I_{i}=\left[x_{i-1}, x_{i}\right], \quad i=1,2, \cdots, N,
$$

记 $h_{i}=x_{i}-x_{i-1}$ 是 $I_{i}$ 的长度， $h=\max_i h_{i}$ 为最大步长。
取相邻结点的中点 $\frac{1}{2}\left(x_{i-1}+x_{i}\right)$ ，将它记为 $x_{i-\frac{1}{2}}$ ，这些点被称为半整数点，由这些半整数点全体和端点

$$
a=x_{0}<x_{\frac{1}{2}}<x_{\frac{3}{2}}<\cdots<x_{i-\frac{1}{2}}<\cdots<x_{N-\frac{1}{2}}<x_{N}=b
$$

又作成了 $[a, b]$ 的一个网格剖分，它被称为原剖分的对偶剖分。如图 1 所示，打＂－＂号的是原剖分结点，打＂$\times$＂号的是对偶剖分结点。

![1](https://s2.loli.net/2025/08/07/cfAgDTvt7hEwI6C.jpg)

<figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
图 1 对区间 $[a, b]$ 的剖分
</figcaption>

接着用差商代替微商的方法将方程(1)在内点 $x_{i}$ 处离散。

$$
\begin{aligned}
-\left.\frac{\mathrm{d}}{\mathrm{~d} x}\left(p \frac{\mathrm{~d} u}{\mathrm{~d} x}\right)\right|_{x_{i}} & =\frac{\left.\left(p \frac{\mathrm{~d} u}{\mathrm{~d} x}\right)\right|_{x_{i}-\frac{1}{2}}-\left.\left(p \frac{\mathrm{~d} u}{\mathrm{~d} x}\right)\right|_{x_{i}+\frac{1}{2}}}{\left(h_{i+1}+h_{i}\right) / 2}+O(h), \\
\left.\left(p \frac{\mathrm{~d} u}{\mathrm{~d} x}\right)\right|_{x_{i-\frac{1}{2}}} & =p\left(x_{i-\frac{1}{2}}\right) \frac{u_{i}-u_{i-1}}{h_{i}}+\left.\frac{h_{i}^{2}}{24}\left(p \frac{\mathrm{~d}^{3} u}{\mathrm{~d} x^{3}}\right)\right|_{z_{i}}
\end{aligned}
$$

记 $p_{i-\frac{1}{2}}=p\left(x_{i-\frac{1}{2}}\right), q_{i}=q\left(x_{i}\right), f_{i}=f\left(x_{i}\right)$ ，可得方程

$$
\begin{array}{r}
-\frac{2}{h_{i}+h_{i+1}}\left[p_{i+\frac{1}{2}} \frac{u_{i+1}-u_{i}}{h_{i+1}}-p_{i-\frac{1}{2}} \frac{u_{i}-u_{i-1}}{h_{i}}\right]+q_{i} u_{i}=f_{i} \\
i=1,2, \cdots, N-1,\tag{12}
\end{array}
$$

用(12)式代替(11)式的截断误差的阶为 $O(h)$。而所缺的两个方程同样可由边界条件得到。
Step4: 是研究这个线性代数方程组的性态，即解的存在性、唯一性以及当 $h \rightarrow 0 $ 时差分解的极限性质，也就是收敛性。(略)

Step5:求解得到的线性代数方程组。

在差分方程组中，将由两个边界条件得到的等式代入 $i=1$ 和 $i=N-1$ 两个方程中消去 $u_{0}$ 和 $u_{N}$ ，便得到了关于 $\boldsymbol{u}=\left(u_{1}, u_{2}, \cdots\right.  ，  \left.u_{N-1}\right)^{T}$ 的 $N-1$ 维的线性代数方程组

$$
Au=f
$$

这里 $A$ 是一个三对角矩阵：

$$
A=\left[\begin{array}{ccccc}
b_{1} & c_{1} & & & \\
a_{2} & b_{2} & c_{2} & & \\
& \ddots & \ddots & \ddots & \\
& & & a_{N-1} & b_{N-2}
\end{array}\right]
$$

而 $ f=\left(f*{1}, f*{2}, \cdots, f*{N-1}\right)^{T} $（这里的 $ f*{N-1}$ 不同于方程组（3．13）中的 $f_{N-1}$ ），我们来考察它的解法。

它的第一个方程是 $u_{1}$ 与 $u_{2}$ 的相互关系，最后一个方程是 $u_{N-2}$ 和 $u_{N-1}$ 的相互关系，而其他方程是 $u_{i-1}, u_{i}, u_{i-1}$ 三者之间的关系。于是，从第一个方程可得到 $u_{1}$ 用 $u_{2}$ 的表示，代入第二个方程，消去 $u_{1}$ ，则可得到 $u_{2}$ 用 $u_{3}$ 的表示，如此等等，直到第 $N-2$ 个方程，可得到 $u_{N-2}$ 用 $u_{N-1}$ 的表示，将这个表示关系代入最后一个方程中消去 $u_{N-2}$ ，便可求出 $u^{N-1}$ 。然后，利用已经建立的 $u_{N-2}$ 用 $u_{N-1}$ 的表示式求出 $u_{N-2}$ ，这样逐个上溯，求出 $u_{N-3}, u_{N-1}, \cdots, u_{2}$ ，最后可通过 $u_{1}$ 用 $u_{2}$ 的表示式算出 $u_{1}$ ，从而解出全部 $u_{i}$ 。

现在来推导计算的具体步骤。设

$$
u_{j}=s_{j} u_{j+1}+t_{j},
$$

将它代入第 $j+1$ 个方程 ($j \geqslant 1$) ，有

$$
a_{j+1}\left(s_{j} u_{j+1}+t_{j}\right)+b_{j+1} u_{j+1}+c_{j+1} u_{j+2}=f_{j+1},
$$

从而

$$
\begin{aligned}
u_{j+1} & =-\frac{c_{j+1}}{b_{j+1}+a_{j+1} s_{j}} u_{j+2}+\frac{f_{j+1}-a_{j+1} t_{j}}{b_{j+1}+a_{j+1} s_{j}} \\
& \equiv s_{j+1} u_{j+2}+t\_{j+1},
\end{aligned}
$$

于是可知

$$
\left\{\begin{array}{l}
s_{j+1}=-\frac{c_{j+1}}{b_{j+1}+a_{j+1} s_{j}}, \quad j=1,2,3, \cdots, N-3, \\
t_{j+1}=\frac{f_{j+1}-a_{j+1} t_{j}}{b_{j+1}+a_{j+1} s_{j}},
\end{array}\right.
$$

显然，当 j=0 时，有

$$
s_{1}=-\frac{c_{1}}{b_{1}}, \quad t_{1}=\frac{f_{1}}{b_{1}},
$$

当 $j=N-2$ 时，即可视上面式中 $c_{N-1}=0$ ，于是

$$
u_{N-1}=\frac{f_{N-1}-a_{N-1} t_{N-2}}{b_{N-1}+a_{N-1} s_{N-2}}=t_{N-1}
$$

这样，整个计算公式可归结为

$$
\left\{\begin{array}{ll}
a_{1}=0, s_{0}, t_{0} \text { 任意, } & \\
s_{j+1}=-\frac{c_{j+1}}{b_{j+1}+a_{j+1} s_{j}}, & j=0,1, \cdots, N-3 \\
t_{j+1}=\frac{f_{j+1}-a_{j+1} t_{j}}{b_{j+1}+a_{j+1} s_{j}}, & j=0,1,2, \cdots, N-2 \\
u_{N-1}=t\_{N-1}, & j=N-2, N-3, \cdots, 1 .\tag{13}
\end{array}\right.
$$

求 $s_{j}$ 和 $t_{j}$ 时的下标由小到大，这被称为＂追＂的过程；求 $u_{j}$ 时恰恰相反，下标由大到小，这被称为＂赶＂的过程，所以(13)式被称为解三对角方程组的**追赶法**。

## 算例

### 算例 1

$$
\left\{\begin{array}{l}
\frac{\mathrm{d}^{2} u}{\mathrm{~d} x^{2}} = \frac{(1-x)u+1}{(1+x)^2}, \quad x \in(0, 1), \\
u(0)=1, u(1)=0.5,
\end{array}\right.
$$

真实解为

$$
u=\frac{1}{1+x}
$$

我们设置时间步长为 $\frac{1}{64},\frac{1}{128},\frac{1}{256}$,我们可以得到如下实验结果：

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch3/example1/example1_1.png?raw=true"
      alt="Adams-Bashforth方法数值解比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 1：算例1差分法不同步长与精确解的比较
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch3/example1/example1_2.png?raw=true"
      alt="Adams-Moulton方法数值解比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 2：算例1差分法不同步长绝对误差的比较
    </figcaption>
  </figure>
</div>

### 算例 2

$$
\left\{\begin{array}{l}
\frac{\mathrm{d}^{2} u}{\mathrm{~d} x^{2}} -\frac{\mathrm{d}u}{\mathrm{~d}x} + u = e^x - 3sinx, \quad x \in(0, \pi), \\
u(0)=-2, u(\pi)=e^{\pi} +3,
\end{array}\right.
$$

真实解为

$$
u=e^x-3cosx.
$$

我们设置时间步长为 $\frac{1}{64},\frac{1}{128},\frac{1}{256}$,我们可以得到如下实验结果：

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch3/example1/example2_1.png?raw=true"
      alt="Adams-Bashforth方法数值解比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 3：算例2差分法不同步长与精确解的比较
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch3/example1/example2_2.png?raw=true"
      alt="Adams-Moulton方法数值解比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 4：算例2差分法不同步长绝对误差的比较
    </figcaption>
  </figure>
</div>

### 算例 3

$$
\left\{\begin{array}{l}
\frac{\mathrm{d}^{2} u}{\mathrm{~d} x^{2}} -x\frac{\mathrm{d}u}{\mathrm{~d}x} + u = -2xcosx +x, \quad x \in(0, \pi), \\
u(0)=0, u(\pi)=\pi,
\end{array}\right.
$$

真实解为

$$
u=x+2sinx.
$$

我们设置时间步长为 $\frac{1}{64},\frac{1}{128},\frac{1}{256}$,我们可以得到如下实验结果：

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch3/example1/example3_1.png?raw=true"
      alt="Adams-Bashforth方法数值解比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 5：算例3差分法不同步长与精确解的比较
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch3/example1/example3_2.png?raw=true"
      alt="Adams-Moulton方法数值解比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 6：算例3差分法不同步长绝对误差的比较
    </figcaption>
  </figure>
</div>

## 总结

我们可以看到边界处都能够算好，中间好像不能算好，算例 3 不知道怎么回事反正是照着书上照抄出来的，好像该方法并没有考虑时间上的变化，就是一个瞬态方程。
