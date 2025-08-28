---
title: 'An efficient hp-Variational PINNs framework for incompressible  Navier-Stokes equations'
authors: [Tanger]
tags: [Legendre–Galerkin, Multidomain, Chebyshev collocation, Spectral method]
date: 2025-08-28
---

这是一篇使用 VPinn 来求解 Navier-Stokes 方程的论文。

# An efficient hp-Variational PINNs framework for incompressible Navier-Stokes equations

我们先来看看这篇论文的摘要：

## 摘要

英文原文：

Physics-informed neural networks (PINNs) are able to solve partial differential equations (PDEs) by incorporating the residuals of the PDEs into their loss functions. Variational Physics-Informed Neural Networks (VPINNs) and hpVPINNs use the variational form of the PDE residuals in their loss function. Although hp-VPINNs have shown promise over traditional PINNs, they suffer from higher training times and lack a framework capable of handling complex geometries, which limits their application to more complex PDEs. As such, hp-VPINNs have not been applied in solving the Navier-Stokes equations, amongst other problems in CFD, thus far. FastVPINNs was introduced to address these challenges by incorporating tensor-based loss computations, significantly improving the training efficiency. Moreover, by using the bilinear transformation, the FastVPINNs framework was able to solve PDEs on complex geometries. In the present work, we extend the FastVPINNs framework to vector-valued problems, with a particular focus on solving the incompressible Navier-Stokes equations for two-dimensional forward and inverse problems, including problems such as the lid-driven cavity flow, the Kovasznay flow, and flow past a backward-facing step for Reynolds numbers up to 200. Our results demonstrate a 2x improvement in training time while maintaining the same order of accuracy compared to PINNs algorithms documented in the literature. We further showcase the framework’s efficiency in solving inverse problems for the incompressible Navier-Stokes equations by accurately identifying the Reynolds number of the underlying flow. Additionally, the framework’s ability to handle complex geometries highlights its potential for broader applications in computational fluid dynamics. This implementation opens new avenues for research on hp-VPINNs, potentially extending their applicability to more complex problems.

翻译：

物理信息的神经网络（PINN）能够通过将 PDE 的残差纳入其损失函数来解决部分微分方程（PDE）。变异物理信息的神经网络（VPINN）和 HPVPINNS 在其损失函数中使用 PDE 残差的变异形式。尽管 HP-vpinns 对传统的 PINN 表现出了希望，但它们遭受了较高的训练时间，并且缺乏能够处理复杂几何形状的框架，从而将其应用限制在更复杂的 PDES 中。因此，迄今为止，尚未应用 HP-VPINN 在求解 Navier-Stokes 方程中，以及 CFD 中的其他问题。引入了 FASTVPINNS，通过结合基于张量的损失计算，从而显着提高训练效率，以应对这些挑战。此外，通过使用双线性转换，FastVpinns 框架能够在复杂的几何形状上求解 PDE。在目前的工作中，我们将 FASTVPINNS 框架扩展到了矢量值问题，特别着眼于解决不可压缩的 Navier-Stokes 方程，以解决二维向前和反向问题，包括诸如盖子驱动的腔流，kovasznay 流量以及以后的阶段进行阶段的阶段，以改进阶段的时间，并将其进行了训练。与文献中记录的 PINNS 算法相比，准确性。我们通过准确识别基础流的雷诺数数量，进一步展示了该框架在解决不可压缩的 Navier-Stokes 方程中的反问题方程的效率。此外，该框架处理复杂几何形状的能力突出了其在计算流体动力学中更广泛应用的潜力。该实施为 HP-VPINNS 研究开辟了新的途径，有可能将其适用性扩展到更复杂的问题上。

## 数值结果

在以下部分中，我们将对 FASTVPINNS 框架进行全面验证，以用于流体流量问题中的应用。我们首先在 Inviscid 汉堡方程式上测试代码，然后将 FASTVPINNS 框架扩展到矢量值问题。接下来，我们使用不可压缩的 Navier-Stokes 方程来解决前进和反问题。我们通过首先求解 kovasznay 流并将预测的解决方案与可用的精确解决方案进行比较，从而验证了 FastVpinns 框架的准确性。对于 Kovasznay 流，我们还比较了 FastVpinns 又有 NSFNETS10 的准确性和效率，我们认为这是基准。我们还对 Kovasznay 流进行了网格连接研究，显示了元素大小对结果准确性的影响。接下来，我们将 FASTVPINNS 框架应用于流体流量问题中的三个规范示例：Liddriven 的腔流，流过矩形通道并流过向后的步骤。我们还通过解决 Falkner-Skan 边界层问题并将我们的结果与文献中建立的结果进行比较 11，我们还证明了 FastVpinns 对层流边界流的适用性。如前所述，FastVpinns 框架可以处理具有偏斜的四边形元素的复杂网格。为了强调这一点，我们解决了一个圆柱体问题的流程，证明了 FastVpinns 在处理非平凡域离散化时的灵活性和鲁棒性。最后，我们通过说明方法在反问题上的应用来结束讨论，通过预测雷诺数的数字，同时求解超过向后的步骤的流程。

FastVpinns Library 已使用 TensorFlow 版本 2.0 编写。对于以下示例，测试功能是形式
