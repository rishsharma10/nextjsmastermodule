'use client';

import React from 'react';
import { Card, Statistic, theme } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface StatCardProps {
  title: string;
  value: number | string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  precision?: number;
  change?: number;
  formatter?: (value: number | string) => string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  precision = 0,
  change,
  formatter,
}) => {
  const { token } = theme.useToken();
  
  const renderChange = () => {
    if (change === undefined) return null;
    
    const isPositive = change >= 0;
    const changeColor = isPositive ? token.colorSuccess : token.colorError;
    const Icon = isPositive ? ArrowUpOutlined : ArrowDownOutlined;
    
    return (
      <div style={{ 
        color: changeColor, 
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        marginTop: '4px',
      }}>
        <Icon />
        {Math.abs(change)}%
      </div>
    );
  };
  
  return (
    <Card
      bordered={false}
      style={{ 
        height: '100%',
        transition: 'all 0.3s',
      }}
      hoverable
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: token.colorTextSecondary, marginBottom: '8px' }}>
          {title}
        </div>
        <Statistic
          value={value}
          precision={precision}
          valueStyle={{ fontWeight: 'bold' }}
          prefix={prefix}
          suffix={suffix}
          formatter={formatter}
        />
        {renderChange()}
      </div>
    </Card>
  );
};

export default StatCard;