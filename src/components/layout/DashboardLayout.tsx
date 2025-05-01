import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   DashboardOutlined,
//   ShoppingCartOutlined,
//   UserOutlined,
//   ShoppingOutlined,
//   BarChartOutlined,
//   DatabaseOutlined,
//   SettingOutlined,
// } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from './Header';

const { Sider, Content } = Layout;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  
  const { token } = theme.useToken();
  
  const menuItems = [
    {
      key: '/',
      // icon: <DashboardOutlined />,
      label: <Link href="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: '/products',
      // icon: <ShoppingOutlined />,
      label: <Link href="/products">Products</Link>,
    },
    {
      key: '/orders',
      // icon: <ShoppingCartOutlined />,
      label: <Link href="/orders">Orders</Link>,
    },
    {
      key: '/customers',
      // icon: <UserOutlined />,
      label: <Link href="/customers">Customers</Link>,
    },
    {
      key: '/inventory',
      // icon: <DatabaseOutlined />,
      label: <Link href="/inventory">Inventory</Link>,
    },
    {
      key: '/analytics',
      // icon: <BarChartOutlined />,
      label: <Link href="/analytics">Analytics</Link>,
    },
    {
      key: '/settings',
      // icon: <SettingOutlined />,
      label: <Link href="/settings">Settings</Link>,
    },
  ];
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        theme="light"
        style={{
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
          position: 'fixed',
          left: 0,
          height: '100vh',
          zIndex: 999,
        }}
      >
        <div style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '0 16px',
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            {/* <ShoppingCartOutlined style={{ fontSize: '24px', color: token.colorPrimary }} /> */}
            {!collapsed && <span style={{ marginLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}>StoreAdmin</span>}
          </Link>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ borderRight: 0, padding: '16px 0' }}
        />
        <div 
          style={{ 
            position: 'absolute', 
            bottom: 0, 
            width: '100%', 
            padding: '16px',
            borderTop: `1px solid ${token.colorBorderSecondary}`,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            type="text"
            // icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ width: collapsed ? '100%' : 'auto' }}
          />
        </div>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 220, transition: 'all 0.2s' }}>
        <Header />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: token.colorBgContainer,
            borderRadius: token.borderRadius,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;