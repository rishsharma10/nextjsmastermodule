import React from 'react';
import { AntForm, Input, Button,FormItem } from '@/antd/lib/AntRegistry';
import { Form } from 'antd';

interface Props {
  user: {
    name: string;
    email: string;
    phone: string;
  };
  onSave: (user: Props['user']) => void;
}

const UserProfileEdit: React.FC<Props> = ({ user, onSave }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSave(values);
  };

  return (
    <AntForm form={form} layout="vertical" initialValues={user} onFinish={handleFinish}>
      <FormItem name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </FormItem>

      <FormItem name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </FormItem>

      <FormItem name="phone" label="Phone" rules={[{ required: true }]}>
        <Input />
      </FormItem>

      <FormItem>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </FormItem>
    </AntForm>
  );
};

export default UserProfileEdit;
