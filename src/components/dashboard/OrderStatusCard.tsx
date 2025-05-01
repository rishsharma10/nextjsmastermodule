'use client';

import React from 'react';
import { Card, Steps, theme } from 'antd';
import { Order } from '@/lib/types';

interface OrderStatusCardProps {
  title: string;
  orders: Order[];
  limit?: number;
}

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  title,
  orders,
  limit = 3,
}) => {
  const { token } = theme.useToken();
  
  const getStepStatus = (order: Order) => {
    switch (order.status) {
      case 'pending':
        return 'process';
      case 'processing':
        return 'process';
      case 'shipped':
        return 'process';
      case 'delivered':
        return 'finish';
      case 'cancelled':
        return 'error';
      case 'refunded':
        return 'wait';
      default:
        return 'wait';
    }
  };
  
  const getStepCurrent = (order: Order) => {
    switch (order.status) {
      case 'pending':
        return 0;
      case 'processing':
        return 1;
      case 'shipped':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 0;
    }
  };
  
  const displayedOrders = orders.slice(0, limit);
  
  return (
    <Card
      title={title}
      bordered={false}
      style={{ height: '100%' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {displayedOrders.map((order) => (
          <div key={order.id} style={{ 
            padding: '16px',
            borderRadius: token.borderRadius,
            background: token.colorBgContainer,
            border: `1px solid ${token.colorBorderSecondary}`,
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '16px',
              alignItems: 'center',
            }}>
              <div style={{ fontWeight: 'bold' }}>{order.orderNumber}</div>
              <div style={{ fontSize: '14px', color: token.colorTextSecondary }}>
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>
            <Steps
              current={getStepCurrent(order)}
              status={getStepStatus(order)}
              size="small"
              items={[
                { title: 'Pending' },
                { title: 'Processing' },
                { title: 'Shipped' },
                { title: 'Delivered' },
              ]}
            />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginTop: '16px',
              fontSize: '14px',
            }}>
              <div>{order.customer.name}</div>
              <div style={{ fontWeight: 'bold' }}>${order.totalAmount.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OrderStatusCard;