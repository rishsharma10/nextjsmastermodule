'use client';

import React from 'react';
import { Layout, Button, Avatar, Dropdown, Badge, theme } from 'antd';
import { 
  BellOutlined, 
  UserOutlined, 
  SettingOutlined, 
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { useAppTheme } from '@/lib/themeProvider';
import Link from 'next/link';
// import { useAppTheme } from '@/lib/theme-provider';

const { Header: AntHeader } = Layout;

const Header = () => {
  const { token } = theme.useToken();
  const { isDarkMode, toggleTheme } = useAppTheme();

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link href="/admin/profile">Profile</Link>,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  const notificationItems = [
    {
      key: '1',
      label: (
        <div>
          <div style={{ fontWeight: 'bold' }}>New Order #1234</div>
          <div style={{ fontSize: '12px', color: token.colorTextSecondary }}>Just now</div>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div>
          <div style={{ fontWeight: 'bold' }}>Product "Headphones" is low in stock</div>
          <div style={{ fontSize: '12px', color: token.colorTextSecondary }}>5 minutes ago</div>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div>
          <div style={{ fontWeight: 'bold' }}>New review from customer</div>
          <div style={{ fontSize: '12px', color: token.colorTextSecondary }}>1 hour ago</div>
        </div>
      ),
    },
  ];

  return (
    <AntHeader style={{ 
      background: token.colorBgContainer, 
      padding: '0 16px',
      position: 'sticky',
      top: 0,
      zIndex: 1,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
      height: 64,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button
          type="text"
          icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          style={{ fontSize: '16px' }}
        />
        <Dropdown 
          menu={{ items: notificationItems }} 
          placement="bottomRight" 
          arrow
        >
          <Badge count={3}>
            <Button type="text" icon={<BellOutlined />} style={{ fontSize: '16px' }} />
          </Badge>
        </Dropdown>
        <Dropdown 
          menu={{ items: userMenuItems as any }} 
          placement="bottomRight" 
          arrow
        >
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Avatar size="small" icon={<UserOutlined />} style={{ marginRight: 8 }} />
            <span>Admin User</span>
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;