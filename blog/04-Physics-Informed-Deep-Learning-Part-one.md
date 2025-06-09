---
title: Physics Informed Deep Learning (Part I):Data-driven Solutions of Nonlinear Partial Differential Equations
authors: [Tanger]
tags: []
date: 2023-06-17
---

## 一些废话

&ensp;&ensp;&ensp;&ensp;首先，本人通过搜索很多 PINN 的论文，发现许多论文都在引用这篇论文，在好奇心的驱使下就在 google 学术上搜索了这篇论文，我们可以看到出现了两个版本，从标题名上看大致相同，作者也没变化。据开组会时，覃老师介绍说可能是因为前面这个版本是相当于没有正式发表还处于一个草稿阶段，后面那篇是经过整理并发表到了比较好的期刊中，我们可以从引用量(比较粗的<font color="red">红线</font>)以及 easyScholar (比较细的<font color="red">红线</font>)打上的标签还有作者希望我们引用这项工作的论文排名(作者更希望我们引用 2019 年正式分布的那篇)中看到区别，但不妨碍这几篇论文的优秀性，总的来说 M Raissi 等人的工作是非常出色的。

![](https://pic.imgdb.cn/item/649d31dc1ddac507cc30c3f0.jpg)

![](https://pic.imgdb.cn/item/649d3c241ddac507cc427561.jpg)

&ensp;&ensp;&ensp;&ensp;他们也将这篇论文的工作产生的代码无私的奉献了出来，可以通过访问 Github 来查看相关代码，上面的代码是 tensorflow 的 1 版本写的，到现在 tensorflow 已经不支持 1 版本的 python 包安装，所以可能需要将上面的代码写成 2 版本的形式才能运行。 👉[点我查看 Github 仓库](https://github.com/maziarraissi/PINNs)

![](https://pic.imgdb.cn/item/649d37c91ddac507cc3a6e68.jpg)

&ensp;&ensp;&ensp;&ensp;这篇论文被视为 PINN 的研究工作的思想源头，他的论文分为三个部分，现在来介绍第一部分。[原论文(Physics Informed Deep Learning (Part I): Data-driven Solutions of Nonlinear Partial Differential Equations)](https://arxiv.org/abs/1711.10561)

&ensp;&ensp;&ensp;&ensp;想要明白 PINN，先从 PINN 是什么说起，PINN 其实是 Physics Informed Deep Learning 的缩写，中文中比较准确的翻译是**物理信息深度学习**，人话就是结合了物理信息的深度学习模型。

&ensp;&ensp;&ensp;&ensp;其实将机器学习用在求解偏微分方程上不是什么难事，但是直接用肯定是不行的，主要面对了几个问题，只要能很好的解决以下问题，那问题就迎刃而解了。

- 数据采集：数据采集的成本太高几乎无法实现，尤其是对小样本的数据样本，绝大多数的机器学习技术缺乏鲁棒性，无法提供任何收敛保证。

- 实际

## Abstract（摘要）

> &ensp;&ensp;&ensp;&ensp;We introduce _physics informed neural networks_– neural networks that are trained to solve supervised learning tasks while respecting any given law of physics described by general nonlinear partial differential equations. In this two part treatise, we present our developments in the context of solving two main classes of problems: data-driven solution and data-driven discovery of partial differential equations. Depending on the nature and arrangement of the available data, we devise two distinct classes of algorithms, namely continuous time and discrete time models. The resulting neural networks form a new class of data-efficient universal function approximators that naturally encode any underlying physical laws as prior information. In this first part, we demonstrate how these networks can be used to infer solutions to partial differential equations, and obtain physics-informed surrogate models that are fully differentiable with respect to all input coordinates and free parameters.

&ensp;&ensp;&ensp;&ensp;摘要的内容如上，建议多读几次，本笔记比较粗浅，有时间建议看看[原文](https://arxiv.org/abs/1711.10561)。

&ensp;&ensp;&ensp;&ensp;翻译成中文（德版 deepl）：我们介绍了物理学上的神经网络 - 神经网络被训练来解决监督学习任务，同时尊重由一般非线性偏微分方程描述的任何特定的物理学规律。在这两部分论文中，我们介绍了我们在解决两类主要问题方面的发展：数据驱动的解决方案和数据驱动的偏微分方程的发现。根据可用数据的性质和安排，我们设计了两类不同的算法，即连续时间和离散时间模型。由此产生的神经网络形成了一类新的数据高效的通用函数近似器，自然地将任何潜在的物理规律编码为先验信息。在这第一部分，我们展示了这些网络如何被用来推断偏微分方程的解决方案，并获得物理信息的代用模型，这些模型对于所有输入坐标和自由参数是完全可微的。
