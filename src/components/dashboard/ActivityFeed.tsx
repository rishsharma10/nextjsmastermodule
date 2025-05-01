'use client';

import React from 'react';
import { Card, Timeline, theme, Avatar, Badge, Tag } from 'antd';
import { 
  ShoppingOutlined, 
  UserOutlined, 
  CommentOutlined, 
  WarningOutlined 
} from '@ant-design/icons';
import { RecentActivity } from '@/lib/types';

interface ActivityFeedProps {
  title: string;
  activities: RecentActivity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ title, activities }) => {
  const { token } = theme.useToken();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingOutlined style={{ color: token.colorPrimary }} />;
      case 'customer':
        return <UserOutlined style={{ color: token.colorSuccess }} />;
      case 'product':
        return <WarningOutlined style={{ color: token.colorWarning }} />;
      case 'review':
        return <CommentOutlined style={{ color: token.colorInfo }} />;
      default:
        return null;
    }
  };
  
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'order':
        return token.colorPrimary;
      case 'customer':
        return token.colorSuccess;
      case 'product':
        return token.colorWarning;
      case 'review':
        return token.colorInfo;
      default:
        return token.colorPrimary;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  return (
    <Card title={title} bordered={false} style={{ height: '100%' }}>
      <Timeline
        items={activities.map((activity) => ({
          color: getActivityColor(activity.type),
          dot: getActivityIcon(activity.type),
          children: (
            <div style={{ marginBottom: '8px' }}>
              <div style={{ marginBottom: '4px' }}>{activity.message}</div>
              <div style={{ color: token.colorTextSecondary, fontSize: '12px' }}>
                {formatTimestamp(activity.timestamp)}
              </div>
            </div>
          ),
        }))}
      />
    </Card>
  );
};

export default ActivityFeed;