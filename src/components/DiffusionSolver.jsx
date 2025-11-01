import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DiffusionSolver = () => {
  const [results, setResults] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(8);

  useEffect(() => {
    solveAll();
  }, []);

  const solveAll = () => {
    const h = 1/16;
    const r = 1/2;
    const tau = r * h * h;
    const N = 16;
    const layers = 8;
    
    // 初始化：在 x=1/2 处设置扰动
    const initU = (N) => {
      const u = new Array(N+1).fill(0);
      const midPoint = Math.floor(N/2);
      u[midPoint] = 1/(2**10); // 扰动值
      return u;
    };

    // 古典显格式
    const classicalExplicit = () => {
      let u = initU(N);
      const history = [u.slice()];
      
      for (let j = 0; j < layers; j++) {
        const uNew = new Array(N+1).fill(0);
        for (let i = 1; i < N; i++) {
          uNew[i] = r * u[i+1] + (1 - 2*r) * u[i] + r * u[i-1];
        }
        u = uNew;
        history.push(u.slice());
      }
      return history;
    };

    // 古典隐格式 (三对角方程求解)
    const classicalImplicit = () => {
      let u = initU(N);
      const history = [u.slice()];
      
      for (let j = 0; j < layers; j++) {
        const uNew = solveTridiagonal(u, r, N);
        u = uNew;
        history.push(u.slice());
      }
      return history;
    };

    // Crank-Nicolson (六点对称格式)
    const crankNicolson = () => {
      let u = initU(N);
      const history = [u.slice()];
      
      for (let j = 0; j < layers; j++) {
        const uNew = solveCN(u, r, N);
        u = uNew;
        history.push(u.slice());
      }
      return history;
    };

    // 三对角方程求解器 (Thomas算法)
    const solveTridiagonal = (u, r, N) => {
      const n = N - 1;
      const a = new Array(n);
      const b = new Array(n);
      const c = new Array(n);
      const d = new Array(n);
      
      // 构造三对角矩阵
      for (let i = 0; i < n; i++) {
        a[i] = -r;
        b[i] = 1 + 2*r;
        c[i] = -r;
        d[i] = u[i+1];
      }
      
      // Thomas算法
      const x = new Array(n);
      const cp = new Array(n);
      const dp = new Array(n);
      
      cp[0] = c[0] / b[0];
      dp[0] = d[0] / b[0];
      
      for (let i = 1; i < n; i++) {
        const m = b[i] - a[i] * cp[i-1];
        cp[i] = c[i] / m;
        dp[i] = (d[i] - a[i] * dp[i-1]) / m;
      }
      
      x[n-1] = dp[n-1];
      for (let i = n-2; i >= 0; i--) {
        x[i] = dp[i] - cp[i] * x[i+1];
      }
      
      const result = new Array(N+1).fill(0);
      for (let i = 0; i < n; i++) {
        result[i+1] = x[i];
      }
      return result;
    };

    // Crank-Nicolson求解器
    const solveCN = (u, r, N) => {
      const n = N - 1;
      const a = new Array(n);
      const b = new Array(n);
      const c = new Array(n);
      const d = new Array(n);
      
      for (let i = 0; i < n; i++) {
        a[i] = -r/2;
        b[i] = 1 + r;
        c[i] = -r/2;
        d[i] = r/2 * u[i+2] + (1-r) * u[i+1] + r/2 * u[i];
      }
      
      // Thomas算法
      const x = new Array(n);
      const cp = new Array(n);
      const dp = new Array(n);
      
      cp[0] = c[0] / b[0];
      dp[0] = d[0] / b[0];
      
      for (let i = 1; i < n; i++) {
        const m = b[i] - a[i] * cp[i-1];
        cp[i] = c[i] / m;
        dp[i] = (d[i] - a[i] * dp[i-1]) / m;
      }
      
      x[n-1] = dp[n-1];
      for (let i = n-2; i >= 0; i--) {
        x[i] = dp[i] - cp[i] * x[i+1];
      }
      
      const result = new Array(N+1).fill(0);
      for (let i = 0; i < n; i++) {
        result[i+1] = x[i];
      }
      return result;
    };

    const explicit = classicalExplicit();
    const implicit = classicalImplicit();
    const cn = crankNicolson();

    setResults({ explicit, implicit, cn, h, tau, N });
  };

  const formatResults = (layer) => {
    if (!results) return { data: [], table: [] };
    
    const data = [];
    const table = [];
    
    for (let i = 0; i <= results.N; i++) {
      const x = i * results.h;
      data.push({
        x: x.toFixed(4),
        显格式: results.explicit[layer][i],
        隐格式: results.implicit[layer][i],
        六点对称: results.cn[layer][i]
      });
      
      table.push({
        i,
        x: x.toFixed(4),
        explicit: results.explicit[layer][i].toExponential(6),
        implicit: results.implicit[layer][i].toExponential(6),
        cn: results.cn[layer][i].toExponential(6)
      });
    }
    
    return { data, table };
  };

  if (!results) return <div className="p-8">计算中...</div>;

  const { data, table } = formatResults(selectedLayer);
  const maxExplicit = Math.max(...results.explicit[8].map(Math.abs));
  const maxImplicit = Math.max(...results.implicit[8].map(Math.abs));
  const maxCN = Math.max(...results.cn[8].map(Math.abs));

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-indigo-900 mb-2">扩散方程差分格式对比分析</h1>
        <div className="text-sm text-gray-600 space-y-1">
          <p>参数设置: h = 1/16, r = 1/2, τ = {results.tau.toExponential(4)}</p>
          <p>初始扰动: u(1/2, 0) = 1/2¹⁰ ≈ {(1/1024).toExponential(4)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">数值解演化图</h2>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">层数:</label>
            <select 
              value={selectedLayer} 
              onChange={(e) => setSelectedLayer(Number(e.target.value))}
              className="border rounded px-3 py-1"
            >
              {[0,1,2,3,4,5,6,7,8].map(i => (
                <option key={i} value={i}>第 {i} 层</option>
              ))}
            </select>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" label={{ value: 'x', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'u(x,t)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => value.toExponential(4)} />
            <Legend />
            <Line type="monotone" dataKey="显格式" stroke="#ef4444" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="隐格式" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="六点对称" stroke="#10b981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">第 8 层数值结果</h2>
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-3 py-2 border">i</th>
                <th className="px-3 py-2 border">x</th>
                <th className="px-3 py-2 border text-red-600">古典显格式</th>
                <th className="px-3 py-2 border text-blue-600">古典隐格式</th>
                <th className="px-3 py-2 border text-green-600">六点对称格式</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border text-center">{row.i}</td>
                  <td className="px-3 py-2 border text-center">{row.x}</td>
                  <td className="px-3 py-2 border text-center font-mono text-xs">{row.explicit}</td>
                  <td className="px-3 py-2 border text-center font-mono text-xs">{row.implicit}</td>
                  <td className="px-3 py-2 border text-center font-mono text-xs">{row.cn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
          <h3 className="font-bold text-red-800 mb-2">古典显格式</h3>
          <p className="text-sm mb-2">最大值: {maxExplicit.toExponential(4)}</p>
          <p className="text-xs text-gray-700">
            <strong>趋势:</strong> 解的峰值振荡衰减，当r=1/2时稳定性临界
          </p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <h3 className="font-bold text-blue-800 mb-2">古典隐格式</h3>
          <p className="text-sm mb-2">最大值: {maxImplicit.toExponential(4)}</p>
          <p className="text-xs text-gray-700">
            <strong>趋势:</strong> 单调平滑扩散，无条件稳定
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
          <h3 className="font-bold text-green-800 mb-2">六点对称格式</h3>
          <p className="text-sm mb-2">最大值: {maxCN.toExponential(4)}</p>
          <p className="text-xs text-gray-700">
            <strong>趋势:</strong> 高精度扩散，O(τ²+h²)误差
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">分析结论</h2>
        
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-bold text-indigo-900 mb-2">📊 变化趋势预测</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>显格式:</strong> 继续计算会保持振荡但幅度逐渐衰减，最终趋于0</li>
              <li><strong>隐格式:</strong> 继续平滑扩散，单调衰减至0，无振荡</li>
              <li><strong>六点对称:</strong> 保持平滑扩散，衰减速度介于两者之间，精度最高</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-indigo-900 mb-2">🔍 原因分析</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>1. 古典显格式 (r=1/2):</strong></p>
              <p className="ml-4">• 稳定性条件: r ≤ 1/2，当前处于临界状态</p>
              <p className="ml-4">• 截断误差: O(τ + h²)，时间方向精度较低</p>
              <p className="ml-4">• 表现: 数值振荡但收敛，若r&gt;1/2则发散</p>
              
              <p className="mt-3"><strong>2. 古典隐格式:</strong></p>
              <p className="ml-4">• 稳定性: 无条件稳定（任意r均稳定）</p>
              <p className="ml-4">• 截断误差: O(τ + h²)</p>
              <p className="ml-4">• 表现: 过度耗散，平滑但精度一般</p>
              
              <p className="mt-3"><strong>3. Crank-Nicolson格式:</strong></p>
              <p className="ml-4">• 稳定性: 无条件稳定</p>
              <p className="ml-4">• 截断误差: O(τ² + h²)，时间方向二阶精度</p>
              <p className="ml-4">• 表现: 最优平衡——既稳定又高精度</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded p-3 mt-4">
            <p className="font-bold text-amber-900">💡 实践建议</p>
            <p className="text-gray-700 mt-1">对于扩散方程，Crank-Nicolson格式是工程中的首选：兼具无条件稳定性和高精度，虽需解方程但三对角系统求解高效。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffusionSolver;