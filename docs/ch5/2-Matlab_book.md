# Matlab微分方程高效解法：谱方法原理与实现

## 第1章 初值问题和边值问题

### 初值问题

#### 欧拉法

略

#### 局部截断误差

略

#### 改进的欧拉法

略

#### 龙格-库塔法

略

#### ode系列函数的用法

略

#### 高阶微分方程的降阶

在初值问题中，odesolver只能用来数值求解一阶微分方程(组)。对于高阶微分方程,可以将其化成一阶微分方程组，进而用odesolver求解，过程如下。

有 $n$ 阶微分方程:

$$
\frac{\mathrm{d}^{n} u}{\mathrm{~d} x^{n}}=f\left(x, u, \frac{\mathrm{~d} u}{\mathrm{~d} x}, \ldots, \frac{\mathrm{~d}^{n-1} u}{\mathrm{~d} x^{n-1}}\right)
$$

其在 $x_{0}$ 处的初始条件为：

$$
\left\{\begin{array}{c}
u\left(x_{0}\right)=\eta_{1} \\
u^{\prime}\left(x_{0}\right)=\eta_{2} \\
\vdots \\
u^{(n-1)}\left(x_{0}\right)=\eta_{n}
\end{array}\right.
$$

做变量代换：

$$
\left\{\begin{array}{c}
u_{1}=u \\
u_{2}=u^{\prime} \\
\vdots \\
u_{n}=u^{(n-1)}
\end{array}\right.
$$

则 $n$ 阶微分方程可写为一阶微分方程组：

$$
\left\{\begin{array}{l}
u_{1}^{\prime}=u_{2} \\
u_{2}^{\prime}=u_{3} \\
\vdots \\
u_{n-1}^{\prime}=u_{n} \\
u_{n}^{\prime}=f\left(x, u_{1}, u_{2}, \ldots, u_{n}\right)
\end{array}\right.
$$

相应初始条件为：

$$
\left\{\begin{array}{c}
u_{1}\left(x_{0}\right)=\eta_{1} \\
u_{2}\left(x_{0}\right)=\eta_{2} \\
\vdots \\
u_{n}\left(x_{0}\right)=\eta_{n}
\end{array}\right.
$$

到这一步就可用 odesolver 直接对其求解了，后面章节在解决高阶微分方程的初值问题时将反复应用此原理。

下面以阻尼振动问题为例：

$$
u^{\prime \prime}+2 \beta u^{\prime}+\omega^{2} u=0, \quad u(0)=1, \quad u^{\prime}(0)=0
$$

这是一个二阶常微分方程的初值问题，它描述了一个弹簧振子或单摆在振动过程中，由于阻力的作用，振幅逐渐减小的现象，其中 $\beta$ 、 $\omega$ 为常数，取 $\beta=1$ 、 $\omega=10$ 。先做变量代换：

$$
\left\{\begin{array}{l}
u_{1}=u \\
u_{2}=u^{\prime}
\end{array}\right.
$$

则式（1－62）变为：

$$
\left\{\begin{array}{ll}
u_{1}^{\prime}=u_{2}, & u_{1}(0)=1 \\
u_{2}^{\prime}=-2 \beta u_{2}-\omega^{2} u_{1}, & u_{2}(0)=0
\end{array}\right.
$$

接下来用 ode45 数值求解，代码如下：

```Matlab

```
