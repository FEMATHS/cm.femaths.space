# 线性多步法

## Adams 方法和 Gear 方法

前面已经说过，Euler 方法可看成对微分方程的等价积分形式

$$
u(t+h)=u(t)+\int_{t}^{t+h} f(\tau, u(\tau)) d \tau,\tag{1}
$$

用左矩形公式近似的结果。那么能否通过更加精确的数值积分公式来提高此方法的精度呢？

设有三组数据如下：

$$
\left\{\begin{aligned}
t_{m}, t_{m-1}, t_{m-2}, \cdots, t_{m-k} ; \\
u_{m}, u_{m-1}, u_{m-2}, \cdots, u_{m-k} ; \\
f_{m}, f_{m-1}, f_{m-2}, \cdots, f_{m-k} ;
\end{aligned}\right.\tag{2}
$$

这里 $t_{i}=t_{0}+i h, u_{i}$ 是 $u\left(t_{i}\right)$ 的近似， $f_{i}$ 是 $f\left(t_{i}, u\left(t_{i}\right)\right)$ 的近似（在推导公式时先将它们看成是精确值）。

若 $u(t)$ 有 $k+2$ 阶连续导数，记 $M\_{k}=\max \left|u^{(k+2)}(t)\right|$， 可将(1)式子中的第一列和第三列中的结点值作为 $f(t,u(t))$ 的 $k$ 次 Lagrange 插值多项式 $p_{m,k}(t)$,记它的余项为 $r_{m,k}(t)$ ,则有

$$
\begin{aligned}
f(t, u(t)) & =p_{m, k}(t)+r_{m, k}(t) \\
& =\sum_{i=0}^{k}\left(\prod_{\substack{j=0 \\
j \neq i}}^{k} \frac{t-t_{m-j}}{t_{m-i}-t_{m-j}}\right) f_{m-i}+\frac{u^{(k+2)}(\xi)}{(k+1)!} \prod_{j=0}^{k}\left(t-t_{m-j}\right).
\end{aligned} \tag{3}
$$

### Adams-Bashforth 方法

若 $u(t)$ 在 $t_m$ 处的近似值 $u_m$ 已求出,取上式中 $t \in\left[t_{m}, t_{m+1}\right]$ ，代入 (1)式，得

$$
u\left(t_{m+1}\right)=u\left(t_{m}\right)+\int_{t_{m},}^{t_{m+1}} p_{m, k}(t) \mathrm{d} t+\int_{t_{m}+1}^{t_{m+1}} r_{m, k}(t) \mathrm{d} t,
$$

舍去余项，并用 $u_{i}$ 代替 $u\left(t_{i}\right)(i=m-k, \cdots, m)$ ，便得到计算格式：

$$
u_{m+1}=u_{m}+h \sum_{i=0}^{k} b_{k, i} f_{m-i},\tag{4}
$$

其组合系数为

$$
\begin{aligned}
b_{k, i} & =\frac{1}{h} \int_{t_{m}}^{t_{m+1}} \prod_{\substack{j=0 \\
j \neq i}}^{k}\left(\frac{t-t_{m-j}}{t_{m-i}-t_{m-j}}\right) \mathrm{d} t \\
& \xlongequal{\text { 令 } t=t_{m}+\tau h} \int_{0}^{1} \frac{\prod_{j \neq i}(j+\tau)}{(-1)^{i}(k-i)!i!} \mathrm{d} \tau \\
& =(-1)^{k-i} \int_{0}^{1}\binom{-\tau}{i}\binom{-\tau-(i+1)}{k-i} \mathrm{~d} \tau,\tag{5}
\end{aligned}
$$

这里

$$
\binom{s}{j}=\frac{s(s-1) \cdots(s-j+1)}{j!}, \quad\binom{s}{0}=1.
$$

(4)式与(5)式称为 Adams－Bashforth 方法。由于该方法中的被插值点 $t \in\left[t_{m}, t_{m+1}\right]$ 在插值结点所决定的最大区间 $\left[t_{m-k}, t_{m}\right]$ 之外，故一般称该方法为 Adams 外插公式。对于常用的 $k \leqslant 5$ 时的情况，系数 $b_{k}$ , 已由下表给出。

$$
\begin{array}{|c|c|c|c|c|c|c|}
\hline
i & 0 & 1 & 2 & 3 & 4 & 5 \\
\hline
1 b_{0,i}      & 1 &   &   &     &     &     \\
2 b_{1,i}      & 3 & -1 &   &     &     &     \\
12 b_{2,i}     & 23 & -16 & 5 &   &     &     \\
24 b_{3,i}     & 55 & -59 & 37 & -9 &     &     \\
720 b_{4,i}    & 1901 & -2774 & 2616 & -1274 & 251 &     \\
1440 b_{5,i}   & 4277 & -7923 & 9982 & -7298 & 2877 & -475 \\
\hline
\end{array}
$$

当 $k=0$ 时，它就是 Euler 方法。
按前面的定义，可知 Adams－Bashforth 方法是一个 $k+1$ 步方法，利用中值定理，其局部截断误差可表示为

$$
\begin{aligned}
R_{m, k} & =\int_{t_{m}}^{t_{m+1}} \frac{u^{(k+2)}(\xi)}{(k+1)!} \prod_{j=0}^{k}\left(t-t_{m-j}\right) \mathrm{d} t \\
& =\frac{u^{(k+2)}(\eta)}{(k+1)!} \int_{t_{m}}^{t_{m+1}} \prod_{j=0}^{k}\left(t-t_{m-j}\right) \mathrm{d} t \\
& =u^{(k+2)}(\eta) h^{k+2}, \quad t_{m} \leqslant \eta \leqslant t_{m+1},\tag{6}
\end{aligned}
$$

即 $R_{m, k}=O\left(h^{k+2}\right)$.

### Adams－Moulton 方法

若 $u(t)$ 在 $t_{m}$ 处的近似值尚未求出，则可以取(5)式中的 $t \in\left[t_{m-1}, t_{m}\right]$ ，完全类似地可得

$$
u\left(t_{m}\right)=u\left(t_{m-1}\right)+\int_{t_{m-1}}^{t_{m}} p_{m, k}(t) \mathrm{d} t+\int_{t_{m-1}}^{t_{m}} r_{m, k}(t) \mathrm{d} t, \tag{7}
$$

舍去余项后，用 $u_{i}$ 代替 $u\left(t_{i}\right)(i=m-k, \cdots, m)$ ，得到计算格式：

$$
u_{m}=u_{m-1}+h \sum_{i=0}^{k} b_{k, i}^{*} f_{m-i},\tag{8}
$$

其组合系数为

$$
b_{k, i}^{*}=(-1)^{k-i} \int_{-1}^{0}\binom{-\tau}{i}\binom{-\tau-(i+1)}{k-i} \mathrm{~d} \tau,\tag{9}
$$

(8)式和(9)式称为 Adams-Moulton 方法（简称 Adams 方法）。由于该方法中的被插值点 $ t \in\left[t_{m-1}, t_{m}\right]$ 在插值结点所决定的区间 $\left[t_{m-k}, t_{m}\right]$ 之内，故一般称为 Adams 内插公式，常用的系数 $b\_{k, i}$ 见下表。

$$
\begin{array}{|c|c|c|c|c|c|c|}
\hline
i & 0 & 1 & 2 & 3 & 4 & 5 \\
\hline
b_{0,i}^{*} & 1 & & & & & \\
\hline
2b_{1,i}^{*} & 1 & 1 & & & & \\
\hline
12b_{2,i}^{*} & 5 & 8 & -1 & & & \\
\hline
24b_{3,i}^{*} & 9 & 19 & -5 & 1 & & \\
\hline
720b_{4,i}^{*} & 251 & 646 & -264 & 106 & -19 & \\
\hline
1440b_{5,i}^{*} & 475 & 1427 & -798 & 482 & -173 & 27 \\
\hline
\end{array}
$$

当 $k=1$ 时，它就是改进 Euler 法。
按前面的定义，可知 Adams－Moulton 方法是一个 $k$ 步方法，其局部截断误差与(6)式类似，可表示为

$$
\begin{aligned}
R_{m, k}^{*} & =\int_{t_{m-1}}^{t_{m}} \frac{u^{(k+2)}\left(\xi^{*}\right)}{(k+1)!} \prod_{j=0}^{k}\left(t-t_{m-j}\right) \mathrm{d} t \\
& =u^{(k+2)}\left(\eta^{*}\right) h^{k+2}, \quad t_{m-1} \leqslant \eta^{*} \leqslant t_{m},
\end{aligned}
$$

所以 $R_{m, k}^{*}$ 与 $R_{m, k}$ 是同阶的。
但是将(4)式与(8)式相比发现，后者少用一个已知点的值却达到了同样的截断误差阶，换句话说，在采用同样多个已知结点作插值时，内插方法比外插方法的截断误差要高一阶。

另外，比较上面两个表可知， $\left|b_{k, i}^{*}\right|$ 比 $\left|b_{k, i}\right|$ 要小一些，这样计算时产生的舍入误差也会相应地小一些，也就是说，在实际计算中，内插法比外插法更精确些。

内插法的右端项中的 $f_{m}=f\left(t_{m}, u_{m}\right)$ 中含有未知量 $u_{m}$ ，即它是一个隐式方法，这可以用迭代的方法来求解，我们将在书本 3.4 节中讨论这个问题。

### Gear 方法

我们也可以从 Euler 方法的第一种解析解释出发，即用 u(t) 的导数的近似值去代替常微分方程初值问题的左端来构造计算格式。

用(2)式的前两列中的结点值作 $u(t)$ 的 $k$ 次 Lagrange 插值多项式 $q*{m, k}(t)$ ，设 $u(t)$ 在 $\left[t*{0}, T\right]$ 上 $k+1$ 次连续可导，记余项为 $s\_{m, k}(t)$ ，则有

$$
\begin{aligned}
u(t) & =q*{m, k}(t)+s*{m, k}(t) \\
& =\sum*{j=0}^{k}\left(\prod*{\substack{j=0 \\
j \neq i}}^{k} \frac{t-t*{m-j}}{t*{m-i}-t*{m-j}}\right) u*{m-i}+\frac{u^{(k+1)}(\xi)}{(k+1)!} \prod*{j=0}^{k}\left(t-t*{m-j}\right)
\end{aligned}
$$

将上式代入 $u\prime =f(t,u)$ 后两边乘 $h$ ，并取 $t=t\_{m}$ ，有

$$
h q*{m, k}^{\prime}\left(t*{m}\right)+h s*{m, k}^{\prime}\left(t*{m}\right)=h f\left(t*{m}, u\left(t*{m}\right)\right)
$$

舍去余项，并用 $u_{i}$ 代替 $u\left(t_{i}\right)(i=m-k, \cdots, m)$ ，便得到计算格式：

$$
\sum*{i=0}^{k} \tilde{c}*{k, i} u*{m-i}=h f*{m}
$$

式中的系数

$$
\begin{aligned}
\bar{c}_{k, i} & =h\left(\prod_{\substack{j=0 \\
j \neq i}}^{k} \frac{t-t*{m-j}}{t*{m-i}-t*{m-j}}\right)*{t=t*{m}}^{\prime} \\
& =\left\{\begin{array}{ll}
\sum*{j=1}^{k} \frac{1}{j}, & i=0 ; \\
(-1)^{i} \frac{1}{i}\binom{k}{i}, & i>0 。
\end{array}\right.,\tag{10}
\end{aligned}
$$

为了便于计算，我们将(10)式改写成

$$
u_{m}+\sum*{i=1}^{k} c*{k, i} u*{m-i}=h g*{k} f*{m},
$$

这里 $c_{k, i}=\tilde{c}_{k, i} / \tilde{c}_{k, 0}, g_{k}=1 / \tilde{c}_{k, 00}$ 这个计算格式称为 $k$ 步 Gear 方法， $k \leqslant 6$ 时系数 $c_{k,i}$ ，和 $g_{k}$ 由表 2.9 给出（已经证明，当 $k>6$ 时 Gear 方法是不稳定的）。

$$
\begin{array}{|c|c|c|c|c|c|c|c|}
\hline
k & c_{k,1} & c_{k,2} & c_{k,3} & c_{k,4} & c_{k,5} & c_{k,6} & g_k \\
\hline
1 & -1 &     &     &     &     &     & 1 \\
2 & -\frac{4}{3} & \frac{1}{3} &     &     &     &     & \frac{2}{3} \\
3 & -\frac{18}{11} & \frac{9}{11} & -\frac{2}{11} &     &     &     & \frac{6}{11} \\
4 & -\frac{48}{25} & \frac{36}{25} & -\frac{16}{25} & \frac{3}{25} &     &     & \frac{12}{25} \\
5 & -\frac{300}{137} & \frac{300}{137} & -\frac{200}{137} & \frac{75}{137} & -\frac{12}{137} &     & \frac{60}{137} \\
6 & -\frac{360}{147} & \frac{450}{147} & -\frac{400}{147} & \frac{225}{147} & -\frac{72}{147} & \frac{10}{147} & \frac{60}{147} \\
\hline
\end{array}
$$

Gear 方法的局部截断误差为

$$
\begin{aligned}
\widetilde{R}_{m, k} & =h \cdot s_{m, k}^{\prime}\left(t*{m}\right) \\
& =h\left[\frac{u^{(k+1)}(\xi)}{(k+1)!} \prod*{j=0}^{k}\left(t-t*{m-j}\right)\right]*{t=t*{m}}^{\prime} \\
& =\frac{u^{(k+1)}(\eta)}{k} h^{k+1}, \quad t*{m-k} \leqslant \eta \leqslant t\_{m}
\end{aligned}
$$

也就是说， $k$ 步 Gear 方法与 k 步 Adams 外插方法的局部截断误差是同阶的，均为 $O\left(h^{k+1}\right)$ 。

Gear 方法与 Adams 内插法一样，也是一个隐式方法，它对本章最后一节叙述的刚性问题的求解是一个非常有力的工具。

## 实验

本节通过数值实验，比较 Adams-Bashforth（显式）、Adams-Moulton（隐式）和 Gear（隐式）三种线性多步法在求解常微分方程初值问题时的表现。我们选取如下初值问题：

$$
\left\{
\begin{aligned}
&u' = u - \frac{2t}{u}, \quad 0 < t \leq 1 \\
&u(0) = 1,
\end{aligned}
\right.
$$

该方程的精确解为 $u(t) = \sqrt{1 + 2t}$。为避免步长计算误差，步长 $h$ 取 $2^{-n}$ 的形式，具体为 $h^{(i)} = 2^{-4i}$（$i=1,2$），$h^{(3)} = 2^{-10}$。

我们分别用 Adams-Bashforth（1-5 阶）、Adams-Moulton（1-5 阶）和 Gear（1-6 阶）方法对上述问题进行数值求解，并与精确解进行对比。实验内容包括：

- **数值解比较**：展示不同方法及不同阶数下的数值解与精确解的对比曲线，直观反映各方法的精度和收敛速度。
- **误差分析**：对比各方法在不同阶数下的全局误差，采用对数坐标展示误差随步长变化的趋势，分析方法的收敛阶和误差特性。
- **收敛性分析**：进一步分析三种方法在不同阶数下的收敛性表现，验证理论收敛阶的正确性，并比较三种方法在相同阶数下的实际收敛速度。

下列图表分别展示了三种方法的数值解、误差和收敛性分析结果。通过这些实验，可以直观地看到不同多步法在实际计算中的优缺点，为后续方法选择和实际应用提供参考。

### 数值解比较

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example5/1.png?raw=true"
      alt="Adams-Bashforth方法数值解比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 1：Adams-Bashforth方法（1-5阶）与精确解的比较
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example5/4.png?raw=true"
      alt="Adams-Moulton方法数值解比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 2：Adams-Moulton方法（1-5阶）与精确解的比较
    </figcaption>
  </figure>
</div>

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example5/6.png?raw=true"
      alt="Gear方法数值解比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 3：Gear方法（1-6阶）与精确解的比较
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example5/8.png?raw=true"
      alt="三种方法4阶比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 4：三种4阶方法的直接比较（AB4 vs AM4 vs Gear4）
    </figcaption>
  </figure>
</div>

### 误差分析

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example5/2.png?raw=true"
      alt="Adams-Bashforth方法误差分析"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 5：Adams-Bashforth方法（1-5阶）的误差分析（对数坐标）
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example5/5.png?raw=true"
      alt="Adams-Moulton方法误差分析"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 6：Adams-Moulton方法（1-5阶）的误差分析（对数坐标）
    </figcaption>
  </figure>
</div>

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example5/7.png?raw=true"
      alt="Gear方法误差分析"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 7：Gear方法（1-6阶）的误差分析（对数坐标）
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example5/9.png?raw=true"
      alt="三种方法4阶误差比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 8：三种4阶方法的误差比较（对数坐标）
    </figcaption>
  </figure>
</div>

### 收敛性分析

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example5/3.png?raw=true"
      alt="Adams-Bashforth方法收敛性分析"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 9：Adams-Bashforth方法（1-5阶）的收敛性分析
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example5/10.png?raw=true"
      alt="Adams-Moulton方法收敛性分析"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 10：Adams-Moulton方法（1-5阶）的收敛性分析
    </figcaption>
  </figure>
</div>

<div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example5/11.png?raw=true"
      alt="Gear方法收敛性分析"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 11：Gear方法（1-6阶）的收敛性分析
    </figcaption>
  </figure>
  <figure style={{ width: '49%', textAlign: 'center', margin: 0 }}>
    <img
      src="https://github.com/FEMATHS/Example/blob/main/ch2/example5/12.png?raw=true"
      alt="三种方法4阶收敛性比较"
      style={{ width: '100%' }}
    />
    <figcaption style={{ fontSize: '90%', color: 'black', fontStyle: 'Times New Roman', marginTop: '4px' }}>
      图 12：三种4阶方法的收敛性比较
    </figcaption>
  </figure>
</div>

### 方法说明

#### Adams-Bashforth 方法（显式）

- 显式多步方法，使用前几个时间点的函数值
- 计算效率高，但稳定性相对较差
- 支持 1-5 阶精度

#### Adams-Moulton 方法（隐式）

- 隐式多步方法，需要迭代求解
- 稳定性好，精度高，但计算成本较高
- 支持 1-5 阶精度

#### Gear 方法

- 专门为刚性微分方程设计的隐式方法
- 具有很好的稳定性性质
- 支持 1-6 阶精度
