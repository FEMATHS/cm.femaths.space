---
title: 'A new analytical formula for the wave equations with variable coefficients'
authors: [Tanger]
tags:
  [variable coefficients, Wave equation, Theoretical study, Thesis Study Notes]
date: 2025-08-06
---

这是一篇变系数的波动方程，提出了一种新的格式。

# A new analytical formula for the wave equations with variable coefficients

## 摘要

**摘要原文：**

This article presents a new analytical formula for the Cauchy problem of the wave equation with variable coefficients, which is a much simpler solution than that given by the Poisson formula. The derivation is based on the variation-of-constants formula and the theory of pseudodifferential operator. The formula is applied to an example to illustrate the feasibility.

**摘要翻译：**

本文提出了一个新的解析公式，用于求解具有变系数的波方程的柯西问题，该公式比泊松公式给出的解要简单得多。该公式的推导基于常数变换公式和伪微分算子理论。该公式被应用于一个例子，以说明其可行性。

<!-- truncate -->

由于这篇论文主要是公式推导再加上实验部分比较简单无图只有一个算例，我们就从前往后看，这些公式是如何一步步推导得到的，由于这篇论文的 Introdutcion 也夹杂着一些公式，所以下面从介绍部分开始看起。

## 介绍

给定其初始位移 $u(x,0)= \varphi(x)$ 和速度 $u_t(x,0)=\psi(x)$ ，众所周知，波动方程的柯西或初始值问题的显式解是

$$
u(x,t)=\frac{1}{2}(\varphi(x-t)+\varphi(x+t))+\frac{1}{2}\int_{x-t}^{x+t}\psi( \xi)d\xi.
$$

对于更高维波动方程的柯西问题，解的推导非常技术性。人们使用各种方法来解决多维波的柯西问题方程。例如，n = 3 时的 Poisson 公式是用球平均法证明的，n = 2 时的解是用阿达玛下降法[3]推导的。分别使用[4]中的经典乘势数列和[5]中的 Adomian 分解方法获得了形式的数列解。[6]中使用傅里叶变换直接推导了任意维 n 的球平均解。[7-9]将波动方程表述为抽象的常系数半线性波动方程，应用 Duhamel 原理，给出了不同类型边界条件下常系数半线性波动方程的所谓常数变分公式。受[7，8]的启发，使用常数变分公式以及将变系数微运算符解释为伪微运算符是本文的核心内容。

考虑以下 $\mathbb{R}^n$ 中变系数线性齐次波动方程的柯西问题

$$
\left\{\begin{aligned} & u_{tt}-Lu=0,\qquad(x,t)\in\mathbb{R}^{n} \times\mathbb{R}_{+},\\ & u(x,0)=\varphi(x),\qquad x\in\mathbb{R}^{n},\\ & u_{t}(x,0)=\psi(x),\qquad x\in\mathbb{R}^{n},\end{aligned}\right.\tag{1}
$$

其中，$L= \sum_{i=1}^{n} \sum_{1=1}^{n}a_{ij} \left( x \right) \frac{ \partial^{2}}{ \partial x_{i} \partial x_{j}}$ 是 具有变系数的二阶线性微运算符，满足系数矩阵 $A =(a_{ij}(x))_{n×n}$ 对称且半定正。对于所有 $x\in \mathbb{R}^n$ 欧几里得。值得注意的是，波动方程（1）的形式几乎与下面右侧 $f\equiv 0$ 的常微方程振动系统相同。

$$
\left\{\begin{aligned} & q_{tt}(t)+Mq(t)=f(q(t)),\\ & q(0)=q_{0},q_{t}(0)=p_{0},\end{aligned}\right.\tag{2}
$$

其中，$ q\in\mathbb{R}^{n} , M\in\mathbb{R}^{n\times n}$ 和 $M$ 是一个对称且半正定矩阵。

近年来，在数值求解振荡系统（2）方面取得了巨大进展。已经提出了许多构造 Runge-Kutta-Nystr om（RKN）型积分器的有用方法（例如，参见[10-14]）。考虑到线性项 Mq 引入的特殊结构，Wu 等人[14]制定了多维扩展 RKN（ERKN）积分器的标准形式。ERKN 积分器自然地精确积分未受干扰的线性方程 $q_{tt} + M_q = 0$，其形式与本文中相关方程相同。[13]中建立了以下常数变化公式，这对于 ERKN 积分器至关重要。它给出了振荡系统（2）的精确解及其求导：

$$
\left\{\begin{aligned} & q(t)=\phi_{0}(t^{2}M)q_{0}+t\phi_{1}(t^{2}M)p_{ 0}+\int_{0}^{t}(t-s)\phi_{1}((t-s)^{2}M)f\big(q(s)\big)ds,\\ & q_{t}(t)=-tM\phi_{1}(t^{2}M)q_{0}+\phi_{0}(t^{2}M)p_{0}+\int_{ 0}^{t}\phi_{0}((t-s)^{2}M)f\big(q(s)\big)ds,\end{aligned}\right.\tag{3}
$$

其中分析函数 $\phi_{j}(\cdot),j=0,1,\ldots$ 被定义为

$$
\phi_{j}(x)\coloneqq\sum_{i=0}^{\infty}\frac{(-1)^{i}x^{i}}{(2i+j)!},\quad j= 0,1,\ldots.\tag{4}
$$

有关 ERKN 积分器的更多详细信息，我们请读者参阅[15-19]。

设右端函数 $f\equiv 0$ ，我们得到线性齐次常微分方程的精确解

$$
\left\{\begin{aligned} & q_{tt}(t)+Mq(t)=0,\\ & q(0)=q_{0},q_{t}(0)=p_{0}\end{aligned}\right.\tag{5}
$$

是

$$
q(t)=\phi_{0}(t^{2}M)q_{0}+t\phi_{1}(t^{2}M)p_{0}.\tag{6}
$$

在本文中，我们将证明变系数线性齐次波动方程（1）也允许形式（6）的解。本文的其余部分组织如下。第 2 节介绍了一些先决条件和注释。第三节介绍了论文的主要结果。推导出变系数线性波动方程的解析公式。在第 4 节中，通过一个例子说明了公式的可行性。

## 先决条件和一些注释

我们将从介绍一些符号开始。多指标 $x=(\alpha_{1},\alpha_{2},\ldots,\alpha_{n})\in\mathbb{Z}_{+}^{n}$ 是非负整数的 $n$ 元组。长度 $|α|$ 的 $α$ 是 $\left| \alpha \right|= \sum_{i=1}^{n} \alpha_{i}= \alpha_{1}+ \alpha_{2}+ \cdots+ \alpha_{n},$ 对于 $x =(x_1,x_2,\dots ,x_n) \in \mathbb{R}^{n}$ ,微运算符 $D^\alpha$ 定义为

$$
D^{\alpha}f(x)=\frac{1}{i^{|\alpha|}}\frac{\partial^{\alpha_{1}}}{\partial x_ {1}^{\alpha_{1}}}\frac{\partial^{\alpha_{2}}}{\partial x_{2}^{\alpha_{2}}} \cdots\frac{\partial^{\alpha_{n}}}{\partial x_{n}^{\alpha_{n}}}f(x).
$$

利用上面的符号，线性微运算符 $L$ 可以写成以下形式

$$
L\equiv L(x,D)=-\sum_{|\alpha|=2}a_{\alpha}(x)D^{\alpha},\tag{7}
$$

其中，$a_{\alpha}(x)=a_{ij}(x)$ 如果 $\alpha=(\alpha_{1},\alpha_{2},\ldots,\alpha_{n})$，其中 $a_i = a_j = 1$ 且 $a_k = 0，k \ne i，j$。

将 Schwartz 空间或在 $\mathbb{R}^n$ 上快速减函数的空间表示为

$$
\mathcal{S}(\mathbb{R}^{n})=\{f\in\mathcal{C}^{\infty}(\mathbb{R}^{n}):\|f\|_ {\alpha,\beta}<\infty,\forall\alpha,\beta\in\mathbb{Z}_{+}^{n}\}
$$

当 $\|f\|_{\alpha,\beta}=\text{sup}_{x\in\mathbb{R}^{n}}|x^{\alpha}D^{\beta}f|.$ 函数的傅里叶变换 $\varphi\in\mathcal{S}(\mathbb{R}^{n})$ 及其求逆公式[20，21]由下式给出

$$
\widehat{\varphi}(\xi)=\int_{\mathbb{R}^{n}}\varphi(x)e^{-ix\cdot\xi}dx\quad \text{and}\quad\varphi(x)=\frac{1}{(2\pi)^{n}}\int_{\mathbb{R}^{n}}\hat{ \varphi}(\xi)e^{i\xi\cdot x}d\xi,\tag{8}
$$

其中, $x·\xi$ 是 $x$ 和 $\xi$ 在 $\mathbb{R}^n$ 中的内积。通过分部积分，可以立即得出：

$$
\widehat{D^{\alpha}\varphi}(\xi)=\xi^{\alpha}\hat{\varphi}(\xi)\quad\text{and} \quad D^{\alpha}\widehat{\varphi}(\xi)=\widehat{x^{\alpha}\varphi}(\xi).\tag{9}
$$

因此，如果 $\varphi(x)\in \mathcal{S}(\mathbb{R}^{n})$ ，则 $\hat{\varphi}(x)\in \mathcal{S}(\mathbb{R}^{n})$ 。此外，如果

$$
(\varphi*\psi)(x)=\int_{\mathbb{R}^{n}}\varphi(x-y)\psi(y)dy,
$$

那么

$$
\widehat{(\varphi\ast\psi})(\xi)= \widehat{\varphi}(\xi)\widehat{\psi}( \xi),\tag{10}
$$

其中，$*$ 表示卷积运算。

根据方程(9)和(10)，我们有，对于 $\varphi(x)\in \mathcal{S}(\mathbb{R}^{n})$

$$
L\varphi(x)=L(x,D)\varphi(x)=\frac{1}{(2\pi)^{n}}\int_{\mathbb{R}^{n}}L(x,\xi )\hat{\varphi}(\xi)e^{i\xi\cdot x}d\xi \tag{11}
$$

其中，$L \left( x, \xi \right)=- \sum_{ \left| \alpha \right|=2}a_{ \alpha} \left( x \right) \xi^{ \alpha}$ 。方程(11)的右边也是对一般函数 $\phi(x,\xi)$ 定义的，而不仅仅是对多项式。更精确地说，如果 $\phi(x,\xi)\in\mathcal{C}^{\infty}(\mathbb{R}^{n}\times\mathbb{R}^{n})$ 满足

$$
\big|D_{\xi}^{\alpha}D_{x}^{\beta}\phi(x,\xi)\big|\leqslant C_{\alpha, \beta}(1+|\xi|)^{m-|\alpha|},\quad\forall\alpha,\beta\in\mathbb{Z}_{+}^{n} \tag{12}
$$

对于某个 $m\in\mathbb{R}_{+}$ ，则我们有以下定义[22]。

### 定义 2.1

$$
(\mathit{\Phi}\varphi)(x)=\frac{1}{(2\pi)^{n}}\int_{\mathbb{R}^{n}}\phi(x, \xi)\hat{\varphi}(\xi)e^{i\xi\cdot x}d\xi \tag{13}
$$

称之为伪微分算子，函数 $φ(x,\xi)$ 称为伪微分算子 $Φ$ 的符号.

## 波动方程的解

在介绍我们的主要结果之前，我们首先讨论 $\phi$ 函数(4)的一些有用性质。可以验证

$$
\phi_{0}(x)=\cos(\sqrt{x}),\quad\phi_{1}(x)=\frac{\sin(\sqrt{x})}{\sqrt{x}},
$$

以及函数 $\phi_{j}(x)\ (j=0,1,\ldots)$ 具有以下循环关系：

$$
\phi_{j+2}(x)=x^{-1}\left(\frac{I}{j!}-\phi_{j}(x)\right),\ j=0,1,\ldots.
$$

应该注意的是，函数 $\phi_1(x)$ 在 $x = 0$ 处也被很好地定义，因为 $\phi_{1}(x)\to 1$ 为 $x \to 0^+$。

通过繁琐的计算，可以得到以下方程。

$$
\begin{split}&\frac{d}{dt}\phi_{0}(t^{2})=-t\phi_{1}(t^{2}), \quad\frac{d}{dt}\left(t\phi_{1}(t^{2})\right)=-\phi_{0}(t^{2}),\\ &\phi_{0}^{2}(x)+x\phi_{1}^{2}(x)=1,\quad x\big(\phi_{1}(x)^{2} -\phi_{0}(x)\phi_{2}(x)\big)=1-\phi_{0}(x),\\ &\phi_{0}(x)+x\phi_{2}(x)=1,\quad\phi_{1}(x)^{2}+x\phi_{2}(x)^{2} =2\phi_{2}(x).\end{split} \tag{14}
$$

由于假设矩阵 $A= \left( a_{ij} \left( x \right) \right)_{n \times n}$ 对于所有 $x \in \mathbb{R}^{n}$ 都是对称的且半正定的，因此我们得到伪微运算符的符号 $-L, L \left( x, \xi \right) \geqslant 0,$ 对于 $\forall x, \xi \in \mathbb{R}^{n}$ 。假设初始数据 $\boldsymbol{\varphi,\psi\in\mathcal{S}(\mathbb{R}^{n})}$ 。对系数 $a_{ij} \left( x \right),i,j=1, \cdots,n$ 的光滑性和增长性进行合理限制，使得（12）适用于 $L( x, \xi)$ ，以下两个伪微运算符

$$
\begin{split}&(\phi_{0}(-t^{2}L)\varphi)(x)=\frac{1}{(2\pi)^{n}} \int_{\mathbb{R}^{n}}\phi_{0}(-t^{2}L(x,\xi))\hat{\varphi}(\xi)e^{i\xi\cdot x} d\xi,\\ &(\phi_{1}(-t^{2}L)\varphi)(x)=\frac{1}{(2\pi)^{n}}\int_{\mathbb{ R}^{n}}\phi_{1}(-t^{2}L(x,\xi))\hat{\varphi}(\xi)e^{i\xi\cdot x}d\xi\end{split} \tag{15}
$$

对于 $\forall t\in\mathbb{R}_{+}$ 有良好的定义，两个伪微运算符的符号分别是 $\phi_{0}(-t^{2}L(x,\xi))$ 和 $\phi_{1}(-t^{2}L(x,\xi))$。

现在，我们准备给出波动方程（1）解的解析公式。

### 定理 3.1

假设初始数据 $\varphi,\psi\in\mathcal{S}(\mathbb{R}^{n})$ 。然后波动方程(1)的柯西问题的解由下式给出

$$
u(x,t)=(\phi_{0}(-t^{2}L)\varphi)(x)+t(\phi_{1}(-t^{2}L)\psi)(x).\tag{16}
$$

### 定理 3.1 的证明

记住(14)，并对(16)的两边关于 t 进行两次微分，得到

$$
u_{t}(x,t)=t(L\phi_{1}(-t^{2}L)\varphi)(x)+(\phi_{0}(-t^{2}L)\psi)(x)
$$

和

$$
u_{tt}(x,t)=(L\phi_{0}(-t^{2}L)\varphi)(x)+t(L\phi_{1}(-t^{2}L)\psi)(x)=(Lu)(x,t).
$$

证毕。

### 注释 3.1

替换 $\phi_0$ 和 $\phi_1$ 的系列展开式，给出波动方程柯西问题的系列解

$$
u(x,t)=\sum_{k=0}^{\infty}\frac{t^{2k}}{(2k)!}L^{k}\varphi(x)+\sum_{k=0}^{ \infty}\frac{t^{2k+1}}{(2k+1)!}L^{k}\psi(x), \tag{17}
$$

其中，$L^k \varphi$ 被解释为 $L(L^{k-1}\varphi)$ 。这个解决方案之前已经在[4，5]中用 $L$ 为拉普拉斯运算符获得了。本文将其扩展到 $L$ 依赖于可变系数的一般情况。

本论文算例部分，虽然叫算例但是这篇论文似乎并没有使用代码来计算相关算例。

## 算例

值得注意的是，公式（16）或（17）独立于空间维度。从计算的角度来看，公式（17）仅涉及分化而不是表面积分，如泊松公式中，计算非常漫长。现在，我们通过一个简单的示例来说明我们的公式。

考虑使用 $N = 3$ 的线性均匀波方程

$$
\left\{\begin{array}{l}
u_{t t}(x, t)-\frac{\partial^{2} u}{\partial x_{1} \partial x_{1}}(x, t)-\sin ^{2}\left(x_{1}+x_{2}+x_{3}\right) \frac{\partial^{2} u}{\partial x_{1} \partial x_{2}}(x, t)-\frac{\partial^{2} u}{\partial x_{2} \partial x_{2}}(x, t) \\
\quad-\cos ^{2}\left(x_{1}+x_{2}+x_{3}\right) \frac{\partial^{2} u}{\partial x_{3} \partial x_{3}}(x, t)=0 \\
u(x, 0)=e^{x_{1}+4 x_{2}+2 x_{3}} \\
u_{t}(x, 0)=\left(x_{1}-x_{2}\right)^{2}-x_{3}^{2}
\end{array}\right.\tag{1}
$$

空间中的线性微运算符是

$$
L=\frac{\partial^{2}}{\partial x_{1} \partial x_{1}}+\sin ^{2}\left(x_{1}+x_{2}+x_{3}\right) \frac{\partial^{2}}{\partial x_{1} \partial x_{2}}+\frac{\partial^{2}}{\partial x_{2} \partial x_{2}}+\cos ^{2}\left(x_{1}+x_{2}+x_{3}\right) \frac{\partial^{2}}{\partial x_{3} \partial x_{3}} .
$$

可以验证矩阵：

$$
A=\left(\begin{array}{ccc}
1 & \frac{\sin ^{2}\left(x_{1}+x_{2}+x_{3}\right)}{2} & 0 \\
\frac{\sin ^{2}\left(x_{1}+x_{2}+x_{3}\right)}{2} & 1 & 0 \\
0 & 0 & \cos ^{2}\left(x_{1}+x_{2}+x_{3}\right)
\end{array}\right)
$$

对所有 $x=\left(x_{1}, x_{2}, x_{3}\right) \in \mathbb{R}^{3}$ ，都是对称半正定的.可以看出

$$
\begin{array}{ll}
L\left(e^{x_{1}+4 x_{2}+2 x_{3}}\right)=21 e^{x_{1}+4 x_{2}+2 x_{3}}, & L^{k}\left(e^{x_{1}+4 x_{2}+2 x_{3}}\right)=21^{k} e^{x_{1}+4 x_{2}+2 x_{3}}, \quad k=2,3, \ldots \\
L\left(\left(x_{1}-x_{2}\right)^{2}-x_{3}^{2}\right)=2, & L^{k}\left(\left(x_{1}-x_{2}\right)^{2}-x_{3}^{2}\right)=0, \quad k=2,3, \ldots
\end{array}
$$

因此，

$$
\begin{array}{l}
\phi_{0}\left(-t^{2} L\right)\left(e^{x_{1}+4 x_{2}+2 x_{3}}\right)=\cosh (\sqrt{21} t) e^{x_{1}+4 x_{2}+2 x_{3}} \\
\phi_{1}\left(-t^{2} L\right)\left(\left(x_{1}-x_{2}\right)^{2}-x_{3}^{2}\right)=\left(1+\frac{t^{2}}{6}\right)\left(\left(x_{1}-x_{2}\right)^{2}-x_{3}^{2}\right).
\end{array}
$$

波动方程（1）的柯西问题的解由下式给出

$$
u(x, t)=\cosh (\sqrt{21} t) e^{x_{1}+4 x_{2}+2 x_{3}}+\left(t+\frac{t^{3}}{6}\right)\left(\left(x_{1}-x_{2}\right)^{2}-x_{3}^{2}\right).
$$

需要指出的是，一般来说，具体问题的封闭形式解决方案并不容易获得。在这种情况下，部分和序列形式的截断序列

$$
u_{K}(x,t)=\sum_{k=0}^{K}\frac{t^{2k}}{(2k)!}L^{k}\varphi(x)+\sum_{k=0}^{K} \frac{t^{2k+1}}{(2k+1)!}L^{k}\psi(x)
$$

可以用来逼近解。

## 总结

还没有细致的去看该论文，似乎提出了一个很好的格式，在计算数学中，格式的作用非常大，格式提得好就能够算好。

📌 **欢迎关注 FEMATHS 小组与山海数模，持续学习更多数学建模与科研相关知识！**
