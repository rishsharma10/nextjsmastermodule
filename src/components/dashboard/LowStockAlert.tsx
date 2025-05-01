'use client';

import React from 'react';
import { Card, Table, Tag, theme, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { Product } from '@/lib/types';

interface LowStockAlertProps {
  title: string;
  products: Product[];
  lowStockThreshold?: number;
}

const LowStockAlert: React.FC<LowStockAlertProps> = ({
  title,
  products,
  lowStockThreshold = 10,
}) => {
  const { token } = theme.useToken();
  
  // Filter products with low stock
  const lowStockProducts = products.filter(
    (product) => product.stock <= lowStockThreshold
  ).sort((a, b) => a.stock - b.stock);
  
  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a style={{ fontWeight: 'bold' }}>{text}</a>,
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      width: 120,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: 100,
      render: (stock: number) => {
        let color = token.colorSuccess;
        if (stock <= 5) {
          color = token.colorError;
        } else if (stock <= lowStockThreshold) {
          color = token.colorWarning;
        }
        
        return (
          <Tag color={color} style={{ fontWeight: 'bold' }}>
            {stock} left
          </Tag>
        );
      },
    },
  ];
  
  return (
    <Card
      title={title}
      extra={<Button type="text" icon={<ReloadOutlined />} />}
      bordered={false}
      style={{ height: '100%' }}
    >
      <Table
        dataSource={lowStockProducts}
        columns={columns}
        rowKey="id"
        pagination={false}
        size="small"
      />
    </Card>
  );
};

export default LowStockAlert;