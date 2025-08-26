---
title: 'Multidomain Legendre–Galerkin Chebyshev-collocation method for one-dimensional evolution equations with discontinuity'
authors: [Tanger]
tags: [Legendre–Galerkin, Multidomain, Chebyshev collocation, Spectral method]
date: 2025-08-26
---

这是一篇比较巧妙地方法（MLGCC）解决多区域微分方程的论文。

# Multidomain Legendre–Galerkin Chebyshev-collocation method for one-dimensional evolution equations with discontinuity

这篇论文先从介绍入手，来整体的看看这篇论文：

在本文中，我们将以下抛物线方程与两个非均匀跳跃条件视为

$$
\begin{cases}\ \partial_{t}U-\partial_{x}(\epsilon\partial_{x}U)=f(x,t),&x \in I_{1}\cup I_{2},t\in(0,T],\\ \ [U]_{0}=\alpha,[\epsilon\partial_{x}U]_{0}=\beta,&t\in(0,T],\\ \ U\left(-1,t\right)=U(1,t)=0,&t\in[0,T],\\ \ U\left(x,0\right)=U_{0}(x),&x\in I,\end{cases} \tag{1.1}
$$

其中，$I_1 = (−1,0), I_2 = (0,1)$ 和 $I = (−1,1),\epsilon |_{I_i} = \epsilon_i $ 是正分段常数，跳跃由 $[v]_0 = v(0+)−v(0−)$ 定义，$α,β$ 是常数。这种跳跃条件在许多地区都会出现[14,2,12]。开发了多域 LegendreGalerkin Chebyshev-collocation（MLGCC）方法来解决该问题（1.1）。该方案基于勒让德方法，但右项和初始项由切比雪夫-高斯-洛巴托 （CGL） 点并置。时间离散化采用 CrankNicolson 方法。该方案基本上处理了第一个跳跃条件，而自然处理了第二个跳跃条件。如[15]所示，构造了适当的基函数来处理并行求解问题（1.1）的接口。推导了稳定性和最佳收敛速率。考虑了 MLGCC 方法在一维（1D）Maxwell 方程和 1D 两相 Stefan 问题中的应用。

文章整理如下。在第 2 节中，可以介绍一些符号和方案。在第 3 节中，给出了近似结果。在第 4 节中，我们证明了全离散方案的稳定性和收敛性。给出了一些相应的数值结果。在第 5 节和第 6 节中，我们使用我们的方法求解了一维麦克斯韦方程组和一维两相 Stefan 问题，并给出了数值结果。

## 符号和方案

在本节中，介绍了一些符号和 MLGCC 方案。让 $(·,·)_J$ 和 $‖·‖_J$ 分别是空间 $L^2(J)$ 的内积和范数。对于任何 $σ > 0$ 的非负整数，我们对配备范数 $‖·‖_{σ,J}$ 和半范数 $|·|_{σ,J}$ .每当 $J = I$ 时，我们去掉下标 $J$。设 $H^{−1}(I) =(H^1_0(I))′$ 为对偶空间。用 $\hat{x}^i_j$ 表示 $\hat{I}=(−1,1)$ 上的 CGL 节点，我们设置 $a_0 = −1,a_1 = 0,a_2 = 1$。定义 $h_i = a_i − a_{i−1}$ 和

$$
I_{N}^{i}=\{x_{j}^{i}:x_{j}^{i}=\frac{h_{i}\hat{x}_{j}^{i}+a_{i-1}+a_{i}}{2}, \ 0\leq j\leq N_{i},\ i=1,2\}.\tag{2.1}
$$

在本文中，我们将使用分段 Sobolev 空间。让 $u_i ：= u|_{I_i}$ 并定义

$$
\begin{split}&\tilde{H}^{\sigma}(I)=\{u: u \mid_{I_{i}}\in H^{ \sigma}(I_{i}),i=1,2\},\\ &\tilde{H}^{1}_{0, \square}=\{u\in\tilde{H}^{1}(I): u(-1)=u(1)= 0,[u]_{0}=\alpha\},\end{split}
$$

带有破半范数的

$$
\left| u \right|_{ \widetilde{H}^{ \sigma} \left( I \right)}= \left( \sum_{i=1,2} \left| u \right|_{ \sigma,I_{i}}^{2} \right)^{1/2}.
$$

设 $\mathbb{P}_{N_i}$ 是最多 $N_i$ 的次数多项式的空间。分段多项式空间定义为

$$
\begin{array}{l}V^{ \square}_{\mathit{N}}=\{\varphi\in\tilde{H}^{1}_{ \mathit{0}, \square}(\mathit{I}):\varphi \mid_{\mathit{I}_{\mathit{i}}}\in \mathbb{P}_{\mathit{N}_{\mathit{i}}},\mathit{i}=\mathit{1},\mathit{2}\},\\ V_{\mathit{N}}=\{\varphi\in H^{1}_{\mathit{0}}(\mathit{I}):\varphi \mid_{ \mathit{I}_{\mathit{i}}}\in\mathbb{P}_{\mathit{N}_{\mathit{i}}},\mathit{i}= \mathit{1},\mathit{2}\}.\end{array} \tag{2.2}
$$

问题 (1.1) 可以用弱形式写成：找到 $U(t)\in\tilde{H}^{\mathsf{1}}_{\mathsf{0},\square}(I)$ 使得对于任何 $V\in H^{\mathbf{1}}_{\boldsymbol{0}}(I)$,

$$
\begin{cases}\ (\partial_{t}U,V)+\sum\limits_{i=1,2}(\epsilon\partial_{ \mathsf{x}}U,\partial_{\mathsf{x}}V)_{I_{i}}=(f,V)-\beta V(\mathsf{0}),&t> \mathsf{0},\\ \ U(\mathsf{x},\mathsf{0})=U_{0}(\mathsf{x}),&\mathsf{x}\in I,\end{cases} \tag{2.3}
$$

基本上, 对第一个跳跃条件进行处理，第二个跳跃条件自然（不处理）。半离散的 Legendre – Galerkin 近似是找到 $u_{N}\in V_{N}^{\Box}$，以便对于任何 $\varphi ∈V_N$,

$$
\left\{\begin{array}{ll}(\partial_{t}u_{N},\varphi)+\sum\limits_{i=1,2}( \epsilon\partial_{\mathsf{x}}u_{N},\partial_{\mathsf{x}}\varphi)_{I_{i}}=(I_{ N}^{\mathsf{C}}f,\varphi)-\beta\varphi(\mathsf{0}),&t>\mathsf{0},\\ u_{N}(\mathsf{x},\mathsf{0})=I_{N}^{\mathsf{C}}U_{\mathsf{0}}(\mathsf{x}),& \mathsf{x}\in I,\end{array}\right.\tag{2.4}
$$

其中，$I^C_N$ 是 Chebyshev 插值运算符，使得

$$
(I_{N}^{\mathsf{C}}v) \mid_{I_{i}} (x_{j}^{i})=v\mid_{I_{i}} (x_{j}^{i} ),\quad x_{j}^{i}\in I_{N}^{i},\ \ 0\leq j\leq N_{i},\ \ i=1,2.\tag{2.5}
$$

设 $τ$ 为变量 $t$ 中的网格大小，并设置 $t_{k}=k\tau\text{, }k=0\text{, }1\text{, }\cdots\text{, }n_{T}\text{ (}n_{T}\tau=T\text{).}$。为简单起见，我们用 uk 表示 uk（x） ：= u（x， tk） 并定义
