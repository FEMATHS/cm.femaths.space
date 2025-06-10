---
title: PPI分析
authors: [zqqqj]
tags: []
date: 2025-06-08
---

这两块代码含量都比较少，大部分通过在线分析就可以出结果
# 7 PPI分析

构建差异表达基因编码的蛋白质之间的相互作用网络，识别关键调控蛋白质或蛋白质复合物。

输出的是PPI网络图及其分析结果，发现核心蛋白质。

在线分析网站：[356 items (Macaca mulatta) - STRING interaction network (string-db.org)](https://string-db.org/cgi/network?taskId=bcsvtUNgt2ym&sessionId=bcOtOSQeQUGK)

可选选项：

1. 隐藏无关联节点
2. 节点多少可由score设置
3. 保存为tsv文件（as tabular test output），进入到cytoscape进行美化
4. 多个选Multiple proteins；单个选Protein by name

# 8 TF分析

通过转录因子分析，识别在细胞亚群中可能调控这些差异表达基因的关键转录因子。输出潜在的调控转录因子及其靶基因网络。
推荐网站：BART，以高变基因为key（但是分析速度很慢，暂且未找到理由，可能是因为我的数据量太大，也有可能是因为TF分析本身就很慢（计算相关性网络非常缓慢，我用的是R语言，读者如果有条件的话可以用python进行计算））