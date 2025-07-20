---
title: 'DeepONet: Learning nonlinear operators for identifying differential equations based on the universal approximation theorem of operators'
authors: [Tanger]
tags: [PINN, Machine Learn, spectral methods, Thesis Study Notes]
date: 2025-07-16
---

这是一篇开山之作提出了一个框架 DeepONet 用于拟合偏微分方程的论文。

# DeepONet: Learning nonlinear operators for identifying differential equations based on the universal approximation theorem of operators

## 摘要

**摘要原文：**

While it is widely known that neural networks are universal approximators of continuous functions, a less known and perhaps more powerful result is that a neural network with a single hidden layer can approximate accurately any nonlinear continuous operator [5]. This universal approximation theorem is suggestive of the potential application of neural networks in learning nonlinear operators from data. However, the theorem guarantees only a small approximation error for a sufficient large network, and does not consider the important optimization and generalization errors. To realize this theorem in practice, we propose deep operator networks (DeepONets) to learn operators accurately and efficiently from a relatively small dataset. A DeepONet consists of two sub-networks, one for encoding the input function at a fixed number of sensors $ x_i = 1, ... , m $ (branch net), and another for encoding the locations for the output functions (trunk net). We perform systematic simulations for identifying two types of operators, i.e., dynamic systems and partial differential equations, and demonstrate that DeepONet significantly reduces the generalization error compared to the fully-connected networks. We also derive theoretically the dependence of the approximation error in terms of the number of sensors (where the input function is defined) as well as the input function type, and we verify the theorem with computational results. More importantly, we observe high-order error convergence in our computational tests, namely polynomial rates (from half order to fourth order) and even exponential convergence with respect to the training dataset size.

**摘要翻译：**

尽管神经网络是连续函数的通用逼近器这一事实广为人知，但一个较少为人所知且可能更强大的结果是：具有单个隐藏层的神经网络能够精确逼近任何非线性连续算子[5]。这一通用逼近定理暗示了神经网络在从数据中学习非线性算子方面的潜在应用。然而，该定理仅保证在网络规模足够大时存在较小的逼近误差，并未考虑重要的优化误差和泛化误差。为了在实践中实现这一定理，我们提出深度算子网络（DeepONets）以从相对较小的数据集准确高效地学习算子。一个 DeepONet 由两个子网络组成：一个用于在固定数量的传感器上编码输入函数 $x_i = 1, ..., m$（分支网络），另一个用于编码输出函数的位置（主干网络）。我们通过系统性模拟识别两种类型的算子，即动态系统和偏微分方程，并证明 DeepONet 相较于全连接网络显著降低了泛化误差。我们还从理论上推导了近似误差与传感器数量（即输入函数定义的传感器数量）以及输入函数类型之间的依赖关系，并通过计算结果验证了该定理。更重要的是，我们在计算测试中观察到高阶误差收敛，即多项式收敛率（从半阶到四阶）甚至与训练数据集大小相关的指数收敛。

## 讨论
