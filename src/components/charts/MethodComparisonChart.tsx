import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { comparisonMetrics } from '../../data/comparisonData';

export const MethodComparisonChart: React.FC = () => {
  const chartData = comparisonMetrics.map((item) => ({
    metric: item.metric,
    'Model A (Citra Saja)': item.modelA,
    'Model B (Citra + Geografis)': item.modelB,
    diff: item.diff
  }));

  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: -10, bottom: 5 }}
          barGap={6}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5EDF0" />
          <XAxis
            dataKey="metric"
            tick={{ fill: '#172B36', fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: '#DCE8ED' }}
            tickLine={false}
          />
          <YAxis
            domain={[75, 100]}
            tick={{ fill: '#647985', fontSize: 11 }}
            axisLine={{ stroke: '#DCE8ED' }}
            tickLine={false}
            unit="%"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #DCE8ED',
              boxShadow: '0 4px 12px rgba(23,43,54,0.08)',
              fontSize: '12px'
            }}
            formatter={(val: any) => [`${val}%`, '']}
          />
          <Legend
            wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
            iconType="circle"
          />
          <Bar
            dataKey="Model A (Citra Saja)"
            fill="#94A3B8"
            radius={[4, 4, 0, 0]}
            maxBarSize={36}
          />
          <Bar
            dataKey="Model B (Citra + Geografis)"
            fill="#07865B"
            radius={[4, 4, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
