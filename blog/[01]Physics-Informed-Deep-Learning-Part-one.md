---
title: Physics Informed Deep Learning (Part I):Data-driven Solutions of Nonlinear Partial Differential Equations
authors: [Tanger]
tags: []
---

## 一些废话

&ensp;&ensp;&ensp;&ensp;首先，本人通过搜索很多 PINN 的论文，发现许多论文都在引用这篇论文，在好奇心的驱使下就在 google 学术上搜索了这篇论文，我们可以看到出现了两个版本，从标题名上看大致相同，作者也没变化。据开组会时，覃老师介绍说可能是因为前面这个版本是相当于没有正式发表还处于一个草稿阶段，后面那篇是经过整理并发表到了比较好的期刊中，我们可以从引用量(比较粗的<font color="red">红线</font>)以及 easyScholar (比较细的<font color="red">红线</font>)打上的标签还有作者希望我们引用这项工作的论文排名(作者更希望我们引用 2019 年正式分布的那篇)中看到区别，但不妨碍这几篇论文的优秀性，总的来说 M Raissi 等人的工作是非常出色的。

![](https://pic.imgdb.cn/item/649d31dc1ddac507cc30c3f0.jpg)

![](https://pic.imgdb.cn/item/649d3c241ddac507cc427561.jpg)

&ensp;&ensp;&ensp;&ensp;他们也将这篇论文的工作产生的代码无私的奉献了出来，可以通过访问 Github 来查看相关代码，上面的代码是 tensorflow 的 1 版本写的，到现在 tensorflow 已经不支持 1 版本的 python 包安装，所以可能需要将上面的代码写成 2 版本的形式才能运行。 👉[点我查看 Github 仓库](https://github.com/maziarraissi/PINNs)

![](https://pic.imgdb.cn/item/649d37c91ddac507cc3a6e68.jpg)

&ensp;&ensp;&ensp;&ensp;这篇论文被视为 PINN 的研究工作的思想源头，他的论文分为三个部分，现在来介绍第一部分。[原论文(Physics Informed Deep Learning (Part I): Data-driven Solutions of Nonlinear Partial Differential Equations)](https://arxiv.org/abs/1711.10561)

&ensp;&ensp;&ensp;&ensp;想要明白 PINN，先从 PINN 是什么说起，PINN 其实是 Physics Informed Deep Learning 的缩写，中文中比较准确的翻译是**物理信息深度学习**，人话就是结合了物理信息的深度学习模型。

&ensp;&ensp;&ensp;&ensp;如果单纯的只是将
