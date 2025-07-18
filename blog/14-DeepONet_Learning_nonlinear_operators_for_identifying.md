---
title: DeepONet Learning nonlinear operators for identifying
authors: [Tanger]
tags: [PINN, Machine Learn, spectral methods, Thesis Study Notes]
date: 2025-07-15
---

这是一篇使用谱元方法与 PINN（物理信息神经网络）相结合的论文。

# Machine‑learning‑based spectral methods for partial differential equations

## 摘要

**摘要原文：**

Spectral methods are an important part of scientific computing’s arsenal for solving partial differential equations (PDEs). However, their applicability and effectiveness depend crucially on the choice of basis functions used to expand the solution of a PDE. The last decade has seen the emergence of deep learning as a strong contender in providing efficient representations of complex functions. In the current work, we present an approach for combining deep neural networks with spectral methods to solve PDEs. In particular, we use a deep learning technique known as the Deep Operator Network (DeepONet) to identify candidate functions on which to expand the solution of PDEs. We have devised an approach that uses the candidate functions provided by the DeepONet as a starting point to construct a set of functions that have the following properties: (1) they constitute a basis, (2) they are orthonormal, and (3) they are hierarchical, i.e., akin to Fourier series or orthogonal polynomials. We have exploited the favorable properties of our custom-made basis functions to both study their approximation capability and use them to expand the solution of linear and nonlinear time-dependent PDEs. The proposed approach advances the state of the art and versatility of spectral methods and, more generally, promotes the synergy between traditional scientific computing and machine learning.

**摘要翻译：**

谱方法是科学计算用于求解偏微分方程 (PDE) 的重要工具。然而，它们的适用性和有效性在很大程度上取决于用于扩展偏微分方程解的基函数的选择。近十年来，深度学习异军突起，成为提供复杂函数高效表示的有力竞争者。在当前的工作中，我们提出了一种将深度神经网络与光谱方法相结合来求解 PDE 的方法。特别是，我们使用一种被称为深度算子网络（DeepONet）的深度学习技术来识别候选函数，并在此基础上扩展 PDE 的求解。我们设计了一种方法，以 DeepONet 提供的候选函数为起点，构建一组具有以下特性的函数：(1) 它们构成一个基础；(2) 它们是正交的；(3) 它们是分层的，即类似于傅里叶级数或正交多项式。

我们利用定制基函数的有利特性，研究了它们的近似能力，并利用它们扩展了线性和非线性时变 PDE 的解。所提出的方法推进了频谱方法的技术水平和多功能性，更广泛地说，促进了传统科学计算与机器学习之间的协同作用。
