---
title: 'CityLearn v2: Energy-flexible, resilient, occupant-centric, and carbon-aware management of grid-interactive communities'
authors: [zqjjj]
tags: [RL]
date: 2025-10-27
---

## Abstract
随着越来越多的分布式能源成为需求侧基础设施的一部分，量化它们在社区规模上提供的能源灵活性非常重要，特别是要了解地理、气候和居住者行为差异对其有效性的影响，以及确定最佳控制策略以加速其在现实世界中的应用。CityLearn为简单和先进的分布式能源控制算法提供基准测试环境，包括基于规则的、模型预测的和强化学习控制。本文介绍的CityLearn v2扩展了CityLearn v1，它提供了一个模拟环境，利用美国建筑库存数据集的最终用途负载概况来创建虚拟网格交互社区，用于弹性、多代理分布式能源和具有动态乘员反馈的目标控制。这项工作详细介绍了v2环境设计，并提供了利用强化学习来管理电池储能系统充放电周期、车辆到电网控制以及热泵功率调制期间的热舒适性的应用示例
## 一. introduction
V1版本很牛，RL也很牛，但是出于一些缺陷我们创建了v2
缺点：
灵活性有限 —— v1 的场景结构和数据接口固定，难以扩展到新的建筑类型、设备或能源载体；
可扩展性受限 —— v1 的配置较为僵化，不支持多层能源系统或跨区域交互；
可复现性不足 —— 不同研究者在构建实验时往往需要修改底层代码，导致实验结果难以公平比较。
V2改进点：
v2 版本在体系结构上进行了彻底重构，支持模块化设计和多层能源系统建模。研究者可以轻松地定义新的建筑类型、能源设备、价格信号、碳排放约束、以及能源共享机制。此外，v2 引入了统一的配置文件系统和标准化的评测接口，使不同实验能够方便地复现与对比。
通过这些改进，CityLearn v2 旨在成为一个面向未来的研究平台，支持：
· 单智能体与多智能体强化学习；
· 集中式与分布式控制；
· 电力与热能的多能源协同；
· 公平、透明的算法评测与结果共享。


### 常见缩写：
**ESSs**：energy storage systems
**DERs**：Distributed energy resources，指分散在不同地点的小型能源设施，如太阳能电池板、风力涡轮机、燃料电池等，可以为当地的能源需求提供可再生能源。
**EVs**：Electric vehicles
**G2V**：grid-to-vehicle
**V2G**：and vehicle-to-grid
**PV**：photovoltaic，光电伏打的，光电的
**DR**：demand response

## 二. environment

这是Building model的总体流程图
![](http://8.130.141.48/wp-content/uploads/2025/10/17613885450058-scaled.jpg)


### 2.1 建筑模型（Building model）

针对小细节，由以下几个部分构成：
还需要声明的是，这些公式不需要转化为代码进行计算，这已经包含在运算包里了，这些公式主要是为了能了解环境中某一个细节是有哪些因素构成的（所以公式也较为简单）

---

#### 2.1.1 电能与热能平衡（Electric and thermal energy balance）

建筑在每个时间步 \( t \) 的净能耗由其电力与热力流量平衡关系决定。  
对任意建筑 \( b \)，电力平衡可表示为：

```math
E_{t,b}^{\text{grid}} = E_{t,b}^{\text{load}} - E_{t,b}^{\text{PV}} - E_{t,b}^{\text{discharge}} + E_{t,b}^{\text{charge}}
```

其中：

- ``(E_{t,b}^{\text{grid}})``：从电网汲取的净电能；  
- ``(E_{t,b}^{\text{load}})``：总电力负荷（包括 HVAC、DHW、家电与电动车等）；  
- ``(E_{t,b}^{\text{PV}})``：光伏系统输出；  
- ``(E_{t,b}^{\text{discharge}})``、``(E_{t,b}^{\text{charge}})``：分别为储能放电与充电功率。

热力系统的能量守恒为：

```math
Q_{t+1,b}^{\text{storage}} = Q_{t,b}^{\text{storage}} + \eta_c Q_{t,b}^{\text{charge}} \Delta t - \frac{1}{\eta_d} Q_{t,b}^{\text{discharge}} \Delta t
```

能量约束为：

```math
Q_{\min} \le Q_{t,b}^{\text{storage}} \le Q_{\max}
```

---

#### 2.1.2 HVAC 与空间热动力学（HVAC and space thermal dynamics）

室内温度动态遵循一阶热阻–热容（RC）模型：

```math
T_{t+1,b}^{\text{in}} = T_{t,b}^{\text{in}} + \frac{\Delta t}{C_b} \left[ \frac{T_{t,b}^{\text{out}} - T_{t,b}^{\text{in}}}{R_b} + \eta_b^{\text{HVAC}} P_{t,b}^{\text{HVAC}} \right]
```

参数定义：

- ``(R_b, C_b)``：建筑热阻与热容；
- ``(T^{\text{in}})``：室内温度；
- ``(T^{\text{out}})``：室外温度；
- ``(\eta_b^{\text{HVAC}})``：HVAC 效率；
- ``(P_{t,b}^{\text{HVAC}})``：HVAC 功率输入；
- ``(\Delta t)``：时间步长。

---

#### 2.1.3 生活热水系统（Domestic hot water, DHW）

热水储能的动态方程：

```
E_{t+1,b}^{\text{DHW}} = E_{t,b}^{\text{DHW}} + \eta_c P_{t,b}^{\text{heat}} \Delta t - \frac{1}{\eta_d} P_{t,b}^{\text{draw}} \Delta t
```

其中：

- ``(P_{t,b}^{\text{heat}})``：热水设备功率；
- ``(P_{t,b}^{\text{draw}})``：用水导致的热能损耗；
- ``(\eta_c, \eta_d)``：充放热效率；
- ``(E_{t,b}^{\text{DHW}})``：热水罐储能。

---

#### 2.1.4 电力储能系统（Electrical storage system）

电池能量更新方程：

```math
E_{t+1,b}^{\text{bat}} = E_{t,b}^{\text{bat}} + \eta_c P_{t,b}^{\text{ch}} \Delta t - \frac{1}{\eta_d} P_{t,b}^{\text{dis}} \Delta t
```

功率约束：

```math
0 \le P_{t,b}^{\text{ch}} \le P_{\max}^{\text{ch}}, \quad 0 \le P_{t,b}^{\text{dis}} \le P_{\max}^{\text{dis}}
```

---

#### 2.1.5 光伏发电（Photovoltaic generation）

```math
P_{t,b}^{\text{PV}} = A_b^{\text{PV}} \cdot \eta_b^{\text{PV}} \cdot G_t
```

其中：

- ``(A_b^{\text{PV}})``：光伏阵列面积；
- ``(\eta_b^{\text{PV}})``：光伏转换效率；
- ``(G_t)``：太阳辐照度。

---

#### 2.1.6 电动车充电（Electric vehicle, EV）

```math
E_{t+1,b}^{\text{EV}} = E_{t,b}^{\text{EV}} + \eta_c P_{t,b}^{\text{EV}} \Delta t
```

约束条件：

```math
E_{\min}^{\text{EV}} \le E_{t,b}^{\text{EV}} \le E_{\max}^{\text{EV}}, \quad 0 \le P_{t,b}^{\text{EV}} \le P_{\max}^{\text{EV}}
```

---

#### 2.1.7 住户交互模型（Occupant interaction model）

```math
T_{t,b}^{\text{set,eff}} = T_{t,b}^{\text{set,agent}} + \delta_{t,b}
```

- ``(T_{t,b}^{\text{set,agent}})``：智能体设定温度；
- ``(\delta_{t,b})``：住户偏差（可随机或基于舒适度模型）。

---

#### 2.1.8 舒适度约束（Comfort constraints）

```math
T_{\min,b} \le T_{t,b}^{\text{in}} \le T_{\max,b}
```

惩罚项：

```math
r_{t,b}^{\text{comfort}} = -\alpha_b \cdot \max(0, T_{t,b}^{\text{in}} - T_{\max,b}) - \beta_b \cdot \max(0, T_{\min,b} - T_{t,b}^{\text{in}})
```

---

#### 2.1.9 成本与排放（Energy cost and emissions）

```math
C_{t,b} = p_t \cdot E_{t,b}^{\text{grid}}, \quad Z_{t,b} = \epsilon_t \cdot E_{t,b}^{\text{grid}}
```

其中：

- ``(p_t)``：时变电价；
- ``(\epsilon_t)``：单位电能碳排放（kgCO₂e/kWh）。

---

#### 2.1.10 总结（Summary）

建筑模型集成了电力、热力、储能、光伏、热水、电动车与住户行为的多物理量方程。  
环境会自动根据这些方程更新建筑状态，为强化学习智能体提供观测、动作空间及奖励反馈。

**说明：**这些物理/能量学公式都已在框架内部实现。实际使用时主要通过配置场景与输出动作即可，但是理解这些公式有助于掌握环境机制与调参逻辑。所以依旧先给出具体公式

### 2.2 Power outage model（停电模型）

停电模型，用于模拟建筑在电网中断事件下的运行行为。该模型允许用户定义停电的持续时间、发生时刻、影响范围（单建筑或全区），

#### 模型定义

用二值变量 ``o_t`` 表示时间步 ``t`` 的供电状态：

```math
o_t =
\begin{cases}
1, & \text{若发生停电 (power outage)} \\
0, & \text{若正常供电 (normal operation)}
\end{cases}
```

当 ``( o_t = 1)`` 时，建筑无法从电网获取电能，因此电网交互项被强制为零：

```math
E_{t,b}^{\text{grid}} = 0
```

此时，建筑的能量供应必须来自于：
- 本地储能（电池或热储能）；
- 局部可再生能源（例如光伏发电）；
- 或削减部分非关键负荷（load shedding）。

#### 能量守恒与储能支撑

在停电状态下，建筑能量平衡更新为：

```math
E_{t+1,b}^{\text{storage}} =
E_{t,b}^{\text{storage}} +
\eta_c P_{t,b}^{\text{charge}}\Delta t -
\frac{1}{\eta_d} P_{t,b}^{\text{discharge}}\Delta t
```

其中：
- 储能系统在供电中断期间成为主要能量来源；
- 动作空间可能受到额外约束（如最大放电功率）；
- 恢复供电后，系统自动切换回正常模式 ``(o_t = 0)``。

---

#### 评估指标

CityLearn v2 为停电模型提供韧性相关指标，包括：
- **自给率（self-sufficiency ratio）**：停电期间本地可满足的能量比例；
- **负荷损失率（load loss ratio）**：停电期间未被满足的能量占比；
- **恢复时间（recovery duration）**：储能充电恢复至正常状态所需时间。

#### 小结
这是一个韧性（resilience）测试机制，可以帮助研究者评估强化学习控制策略在 **电网韧性**、**自恢复能力** 和 **关键负荷保障** 方面的性能。
该模块同样也内置于环境中，无需手动实现，只需在场景配置文件中指定停电时段与策略响应参数即可启用。

### 2.3 Key performance indicators（KPI）
就是指标，注意是个最小化指标（越小越好）
![](http://8.130.141.48/wp-content/uploads/2025/10/17613885450058-scaled.jpg)


### 2.4 Datasets
没啥好说的

### 2.5 Environment design workflow
以EULP dataset为例，给出改框架的具体流程
![](http://8.130.141.48/wp-content/uploads/2025/10/17615401546467.jpg)
**1：数据收集**
收集建筑元数据（如建筑类型、区域气候区、设备可用性等）
收集真实或合成的负荷／光伏／天气／电价／碳排放时间序列数据 
**2：负荷模拟与数据集准备**
通过建筑热模型、设备模型、行为模型等将原始数据处理为可用的仿真输入（如每栋建筑每小时的负荷、PV 输出、储能状态等），构建环境配置文件（building attributes, DER sizing, shared storage, outage model 等），并生成场景 YAML/JSON 文件
**3：控制模拟与结果报告**
将环境载入框架，训练或评估 RL 或其它控制策略，接着执行动作-观测-奖励（RL流程）循环，采集结果。最后根据 KPI 计算性能指标，输出报告或日志

## 三. Control
没啥用，反正就是阐讲CityLearn的控制接口结构及三种控制配置（单智能体、独立多智能体、协同多智能体），同时说明该框架不仅支持 RL，还兼容 RBC 与 MPC 等传统控制算法，以实现从启发式控制到学习控制的统一研究平台。

在**单智能体配置**下，控制智能体与多个建筑呈一对多关系：
一个集中式智能体收集所有建筑的观测，为区域内所有 DER （分布式能源资源） 分配动作，并在每个时间步接收一个统一的奖励值，用以学习通用控制策略。这种方式类似于能源聚合商（energy aggregator）集中管理灵活负荷的分布式控制。

**独立多智能体**配置下，控制智能体与建筑是一对一关系：
每个建筑对应一个智能体，因此每个时间步产生与建筑数相等的奖励，并为每栋建筑分别学习独立的控制策略。

**协同多智能体**配置与独立多智能体类似，
但智能体之间可以共享信息，以实现协作目标（例如降低区域峰值负荷）
或竞争目标（例如在能源灵活性市场中进行价格竞标）。

## 四. Examples
篇幅原因，看下一篇吧。因为打算复现+解释
