# 差分法解边值问题

有限差分法和有限元法是求微分方程近似解的两种重要的数值方法，它们的**共同特点**是**将连续的问题和区域进行各种形式的离散，最后化为有限形式的线性代数方程组**。有限差分法与有限元法的**最大区别**在于前者的处理直接施加于所给的微分方程本身，而后者则需要先把微分方程化成其他形式的数学问题再加以处理。它们的共同点决定了这两种方法在总的处理思路和大的步骤上有不少相同或类似之处，而它们的不同点又导致了这两种方法的具体操作实施具有无法比拟的各自的特殊性。

先从比较简单的两点边值问题的差分法讲起。

## 解两点边值问题的差分方法

考虑最简单的常微分方程边值问题

$$
\left\{\begin{array}{l}
{\rm L} u \equiv-\frac{\mathrm{d}^{2} u}{\mathrm{~d} x^{2}}+q u=f, \quad x \in(a, b), \\
u(a)=\alpha_{0}, u^{\prime}(b)+\beta u(b)=\alpha_{1},
\end{array}\right.\tag{1}
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
x_{i-1} \leqslant \xi_{i} \leqslant x_{i+10}
\end{array}
$$

记余项

$$
R_{i}(u)=-\frac{h^{2}}{12} u^{(t)}\left(\xi_{i}\right)
$$

则在 $x_{i}$ 处可将方程(1)写成

$$
-\frac{u\left(x_{i+1}\right)-2 u\left(x_{i}\right)+u\left(x_{i-1}\right)}{h^{2}}+q\left(x_{i}\right) u\left(x_{i}\right)=f\left(x_{i}\right)+R_{i},
$$

舍去余项，便得到逼近方程(1)的差分方程：

$$
\begin{array}{r}
L_{\mathrm{h}} u_{i} \equiv-\frac{u_{i+1}-2 u_{i}+u_{i-1}}{h^{2}}+q_{i} u_{i}=f_{i}, \\
i=1,2, \cdots, N=1,
\end{array}
$$

其中, $q_{i}=q\left(x_{i}\right), f_{i}=f\left(x_{i}\right)$ ,而 $u_{i}$ 是 $u(x)$ 在 $x_{i}$ 处的近似值，也就是所要寻找的差分解。(3．6)式中 $\mathrm{L}_{\mathrm{h}}$ 为差分算子（ $\mathrm{L}_{\mathrm{h}}$ 用白正体字母表示，今后同）。

利用差分算子 $\mathrm{L}_{\mathrm{h}}$ ，（3．5）可写成：

$$
{\rm L_{h}} u\left(x_{i}\right)=f\left(x_{i}\right)+R_{i},
$$

所以, $ R*{i} $ 就是差分算子 $\mathrm{L}*{\mathrm{h}}$ 代替微分算子 $\rm L$ 所引起的截断误差，它的阶是 O\left(h^{2}\right) 。

第三步，边界条件的处理。
在（3．6）式中出现了 N+1 个未知量 $u_{0}, u_{1}, \cdots, u_{N-1}, u_{N}$ ，但只有
