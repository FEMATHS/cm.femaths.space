---
title: 'CityLearn v1.0 - An OpenAI Gym Environment for Demand Response with Deep Reinforcement Learning'
authors: [zqjjj]
tags: [RL]
date: 2025-10-27
---

# CityLearn v1.0 - An OpenAI Gym Environment for Demand Response with Deep Reinforcement Learning
## abstract
需求响应（Demand Response, DR）可在美国电力需求峰值中减少约 20%，而建筑物占总电力需求的约 70%。然而，建筑能耗系统动态复杂且难以建模，传统方法难以协调不同建筑或能源系统。强化学习（RL）因其自适应、无需模型的特性，能基于历史与实时数据实现智能能耗控制。
然而，目前 DR 领域的研究缺乏统一标准，实验难以复现，算法性能也难以比较。为此，作者提出 CityLearn —— 一个基于 OpenAI Gym 的开源强化学习仿真环境，可让研究者方便地实现、共享、复现并比较不同的 DR 控制算法。该框架模块化、可扩展，支持多种储能与发电设备模型。
## introduction
美国建筑能耗占全国电力消耗的约 70%，且城市区域的电力需求不断上升，造成输电压力与电价上涨。需求响应（DR）通过激励机制引导用户调整用电模式，从而削减峰值负荷、提高电网稳定性。
然而，为了让 DR 真正有效，需要智能、分布式的负载协调。如果所有设备同时响应相同信号，可能只是“移峰”而非“削峰”。传统控制方法（如 MPC）虽有效，但需依赖昂贵且精确的物理建模。
强化学习（RL）可以在无模型的条件下，通过与环境交互学习最优策略，从实时和历史数据中自动优化建筑能耗管理。但该领域缺乏统一标准，使得不同研究难以比较。为此，作者提出了 CityLearn —— 一个面向城市级能耗优化的强化学习仿真框架，用于统一测试环境、便于算法比较与复现
## CityLearn
CityLearn 的目标是：为城市级的建筑群（而非单栋建筑）提供一个标准化的 RL 研究平台
### 1. architecture
使用bottom-up design：
bottom components：能量存储系统（如蓄热、蓄电池）与能量供应系统（如热泵、太阳能）。
Building class：每栋建筑整合了自身的设备模型与能耗需求。
CityLearn class：整合多个建筑，并继承自 OpenAI Gym 环境，使其成为一个可直接与 RL 智能体交互的仿真环境。
### 2. 功能特性
语言: Python，可从 GitHub 免费下载。
灵活数据输入：可加载实际建筑的供热/制冷需求数据，也可使用代理模型（surrogate models）。
设备模型：v1.0 版本包含空气源热泵（air-to-water heat pump）、热能储存系统、以及电池模型
建筑热负荷来源：使用CitySim simu，该工具能在城市尺度下利用几何与物理简化模型估算建筑的热负荷，考虑了太阳辐射、室内活动、热损失等因素。
### 3. relationship with OpenAI Gym
1. 继承 Gym 环境接口，实现与强化学习算法的无缝集成
2. 研究者可直接将现有 Gym 智能体（如 DDPG、PPO、A3C 等）应用于建筑能耗控制。
3. Gym 生态允许算法间的统一评测与可重现比较，就像 RL 研究中常见的 Atari 或 robotics 环境一样。
### 4. 流程图
![](http://8.130.141.48/wp-content/uploads/2025/10/17613777480983.jpg)

  
**part1**
1. 一个建筑对应一个agent，智能体通过Actor网络（output：动作$a$）和Critic(output：$q$)网络学习策略
2. 输入为当前环境状态$s$，输出是控制动作$a$
3. 训练时，agent接收反馈（奖励$r$，下一状态$s_{t+1}$）
4. RL经典交互循环为：$(s, a, r, s_{t+1})$(state -> action -> reward -> next state)

**part2**
1. 电网向各建筑提供电能。
2. 电价（price）会随时间变化（例如分时电价或高峰电价）。
3. 各建筑根据电价调整自己的用电需求（demand）。

  强化学习的目标就是学会在不同电价和需求下，削峰填谷（peak shaving），以降低整体用电成本并平滑负荷曲线。
  
**part3**
1. Heat pump（热泵）：负责制冷或供热，是主要的能耗设备。
2. Energy storage（储能系统）：可以在低价时储能、高价时放能，用于平滑能耗。
3. Building cooling loads（建筑冷负荷）：代表建筑内部的能量需求（例如空调负荷）。
这三部分构成了一个局部能源系统并与电网交互，在此可以理解为数据集

**part4**
整个城市中有 n 栋建筑，对应 n 个agents。各建筑既独立学习，又可以共享信息或通过价格信号间接协调，以此实现整体的分布式能耗优化
最终目标是让整个城区的负荷曲线更平滑，降低峰值功率需求。

## demo
不演示了，因为是v1版本，我觉得已经过时了

## conclusion
懒的说了，前面解释的很清楚了
