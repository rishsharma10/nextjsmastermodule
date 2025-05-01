export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  stock: number;
  images: string[];
  rating: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  sku: string;
  status: 'active' | 'inactive' | 'draft';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  totalSpent: number;
  totalOrders: number;
  firstPurchase: string;
  lastPurchase: string;
  status: 'active' | 'inactive';
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  averageOrderValue: number;
  revenueGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  topSellingProducts: {
    id: string;
    name: string;
    sold: number;
    revenue: number;
  }[];
  revenueByDay: {
    date: string;
    revenue: number;
  }[];
}

export interface RecentActivity {
  id: string;
  type: 'order' | 'customer' | 'product' | 'review';
  message: string;
  timestamp: string;
  data: unknown;
}