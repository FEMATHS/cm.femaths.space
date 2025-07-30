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
& =u^{(k+2)}(\eta) h^{k+2}, \quad t_{m} \leqslant \eta \leqslant t_{m+1},
\end{aligned}
$$

即 $R_{m, k}=O\left(h^{k+2}\right)$.

### Adams－Moulton 方法

若 $u(t)$ 在 $t_{m}$ 处的近似值尚未求出，则可以取（2．54）式中的 $t \in\left[t_{m-1}, t_{m}\right]$ ，完全类似地可得

$$
u\left(t_{m}\right)=u\left(t_{m-1}\right)+\int_{t_{m-1}}^{t_{m}} p_{m, k}(t) \mathrm{d} t+\int_{t_{m-1}}^{t_{m}} r_{m, k}(t) \mathrm{d} t
$$

舍去余项后，用 $u_{i}$ 代替 $u\left(t_{i}\right)(i=m-k, \cdots, m)$ ，得到计算格式：

$$
u_{m}=u_{m-1}+h \sum_{i=0}^{k} b_{k, i}^{*} f_{m-i}
$$

其组合系数为
