'use client';

import React from 'react';
import { Card, theme } from 'antd';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getRandomColor } from '@/utils';

export type ChartType = 'area' | 'bar' | 'line' | 'pie';

interface AnalyticsChartProps {
  title: string;
  subTitle?: string;
  data: any[];
  type: ChartType;
  dataKey: string;
  xAxisDataKey?: string;
  height?: number;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  subTitle,
  data,
  type,
  dataKey,
  xAxisDataKey = 'name',
  height = 300,
  colors,
  showLegend = true,
  showGrid = true,
}) => {
  const { token } = theme.useToken();
  
  const renderChart = () => {
    const defaultColors = [
      token.colorPrimary,
      token.colorSuccess,
      token.colorWarning,
      token.colorError,
    ];
    
    const chartColors = colors || defaultColors;
    
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={token.colorBorderSecondary} />}
              <XAxis 
                dataKey={xAxisDataKey} 
                tick={{ fill: token.colorTextSecondary, fontSize: 12 }}
              />
              <YAxis tick={{ fill: token.colorTextSecondary, fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: token.colorBgElevated,
                  border: `1px solid ${token.colorBorderSecondary}`,
                  borderRadius: token.borderRadius,
                }}
              />
              {showLegend && <Legend />}
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={chartColors[0]}
                fill={chartColors[0]}
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={token.colorBorderSecondary} />}
              <XAxis 
                dataKey={xAxisDataKey} 
                tick={{ fill: token.colorTextSecondary, fontSize: 12 }}
              />
              <YAxis tick={{ fill: token.colorTextSecondary, fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: token.colorBgElevated,
                  border: `1px solid ${token.colorBorderSecondary}`,
                  borderRadius: token.borderRadius,
                }}
              />
              {showLegend && <Legend />}
              <Bar dataKey={dataKey} fill={chartColors[0]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={token.colorBorderSecondary} />}
              <XAxis 
                dataKey={xAxisDataKey} 
                tick={{ fill: token.colorTextSecondary, fontSize: 12 }}
              />
              <YAxis tick={{ fill: token.colorTextSecondary, fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: token.colorBgElevated,
                  border: `1px solid ${token.colorBorderSecondary}`,
                  borderRadius: token.borderRadius,
                }}
              />
              {showLegend && <Legend />}
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={chartColors[0]}
                activeDot={{ r: 8 }}
                dot={{ stroke: chartColors[0], strokeWidth: 2, r: 4, fill: token.colorBgContainer }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={30}
                dataKey={dataKey}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getRandomColor(index)} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: token.colorBgElevated,
                  border: `1px solid ${token.colorBorderSecondary}`,
                  borderRadius: token.borderRadius,
                }}
              />
              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Card
      title={title}
      extra={subTitle && <span style={{ color: token.colorTextSecondary }}>{subTitle}</span>}
      bordered={false}
      style={{ height: '100%' }}
    >
      {renderChart()}
    </Card>
  );
};

export default AnalyticsChart;