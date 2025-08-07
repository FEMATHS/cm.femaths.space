---
title: 'An efficient neural-network and finite-difference hybrid  method for elliptic interface problems with applications'
authors: [Tanger]
tags:
  [
    elliptic interface problem,
    Stokes equations,
    Theoretical study,
    Thesis Study Notes,
  ]
date: 2025-08-07
---

这是一篇变系数的波动方程，提出了一种新的格式。

# A new analytical formula for the wave equations with variable coefficients

## 摘要

**摘要原文：**

A new and efficient neural-network and finite-difference hybrid method is developed
for solving Poisson equation in a regular domain with jump discontinuities on embedded irregular interfaces. Since the solution has low regularity across the interface,
when applying finite difference discretization to this problem, an additional treatment
accounting for the jump discontinuities must be employed. Here, we aim to elevate
such an extra effort to ease our implementation by machine learning methodology.
The key idea is to decompose the solution into singular and regular parts. The neural
network learning machinery incorporating the given jump conditions finds the singular solution, while the standard five-point Laplacian discretization is used to obtain
the regular solution with associated boundary conditions. Regardless of the interface
geometry, these two tasks only require supervised learning for function approximation
and a fast direct solver for Poisson equation, making the hybrid method easy to implement and efficient. The two- and three-dimensional numerical results show that
the present hybrid method preserves second-order accuracy for the solution and its
derivatives, and it is comparable with the traditional immersed interface method in
the literature. As an application, we solve the Stokes equations with singular forces to
demonstrate the robustness of the present method.

**摘要翻译：**

一种新型高效的神经网络与有限差分混合方法被开发用于求解具有嵌入式不规则界面跳变不连续性的规则域中的泊松方程。由于解在界面处具有较低的正则性，当对该问题应用有限差分离散化时，必须采用额外处理以考虑跳变不连续性。本文旨在通过机器学习方法将此额外处理简化，以提升实现效率。

核心思想是将解分解为奇异部分和规则部分。神经网络学习机制结合给定的跳变条件求解奇异解，而标准五点拉普拉斯离散化用于获得满足边界条件的规则解。无论界面几何如何，这两个任务仅需监督学习进行函数逼近和快速直接求解器求解泊松方程，使混合方法易于实现且高效。二维和三维数值结果表明，本混合方法可保持解及其导数的二阶精度，且与文献中传统的浸入式界面方法相当。作为应用示例，我们通过求解带有奇异力的斯托克斯方程，验证了本方法的鲁棒性。

<!-- truncate -->

## 结论和展望

本文在分析了现有文献的基础上，本文提出了一类新的数值方法来求解椭圆型界面问题，该问题的解和导数在界面上具有跳跃间断，其关键思想是将解分解为奇异解（非平滑）和规则（平滑）奇异部分由神经网络表示形成，所述神经网络表示通过使用并入所有给定跳跃信息的监督学习机器而找到本文提出了一种基于有限差分离散的快速直接求解方法，该方法可以有效地求解泊松方程的正则部分，因此，该方法的实现简单，和三维 Poisson 界面问题的数值实验表明，所提出的神经网络方法具有良好的收敛性和鲁棒性.网络和有限差分混合方法可以获得二阶精度的解及其导数.虽然所有的例子都只考虑了一个嵌入式接口，但实现多个接口的混合方法是很简单的.作为应用，我们将该方法用于求解具有奇异力的二维 Stokes 方程.同样，数值结果表明，所有的流体变量及其导数在最大模误差下都具有二阶收敛性。

本文的混合方法可作为求解 Navier-Stokes 流问题投影步中涉及的 Poisson 界面问题的快速求解器，我们的未来工作旨在将本文的方法推广到求解规则甚至不规则区域中的变系数椭圆界面问题。

## 实验

在本节中，我们通过两个数值测试来检查所提出的方法的准确性，包括解决二维和三维泊松界面问题。在每个测试中，神经网络函数 V 通过具有 S 形激活函数的浅网络简单地表示，其中仅使用单个隐藏层。由于浅网络结构，它只需要训练适量的参数，（在所有数值示例中使用了几百个参数），因此学习该网络函数是有效的，例如，在 iMac（2021）上只需几秒钟即可完成。由于以下问题中考虑的所有计算域都是正则的，（2D 中的正方形和 3D 中的立方体），为了求解规则部分 w，我们建立了在每个空间方向上具有相同网格尺寸 h 的均匀笛卡尔网格布局。
