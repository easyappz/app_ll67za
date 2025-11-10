import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, Typography, message, Spin } from 'antd';
import { getProfile, updateProfile } from '../api/profile.js';
import { useAuth } from '../auth/AuthContext.jsx';

const { Title } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user, setUser } = useAuth();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getProfile();
        if (!mounted) return;
        form.setFieldsValue({
          email: data.email || '',
          first_name: data.first_name || '',
          last_name: data.last_name || '',
        });
        setUser(data);
      } catch (e) {
        // errors handled globally
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [form, setUser]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      const payload = { first_name: values.first_name, last_name: values.last_name };
      const data = await updateProfile(payload);
      form.setFieldsValue({
        email: data.email || '',
        first_name: data.first_name || '',
        last_name: data.last_name || '',
      });
      setUser(data);
      message.success('Профиль обновлен');
    } catch (e) {
      const msg = e?.response?.data?.detail || 'Не удалось обновить профиль';
      message.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-easytag="id1-src/pages/Profile.jsx" style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <Card data-easytag="id2-src/pages/Profile.jsx" style={{ maxWidth: 640, width: '100%' }}>
        <Title level={3} data-easytag="id3-src/pages/Profile.jsx">Профиль</Title>
        {loading ? (
          <div data-easytag="id4-src/pages/Profile.jsx" style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
            <Spin />
          </div>
        ) : (
          <Form data-easytag="id5-src/pages/Profile.jsx" form={form} layout="vertical" onFinish={onFinish} initialValues={{ email: user?.email || '' }}>
            <Form.Item label="Почта" name="email">
              <Input data-easytag="id6-src/pages/Profile.jsx" disabled />
            </Form.Item>
            <Form.Item label="Имя" name="first_name" rules={[{ required: true, message: 'Укажите имя' }]}>
              <Input data-easytag="id7-src/pages/Profile.jsx" placeholder="Иван" />
            </Form.Item>
            <Form.Item label="Фамилия" name="last_name" rules={[{ required: true, message: 'Укажите фамилию' }]}>
              <Input data-easytag="id8-src/pages/Profile.jsx" placeholder="Иванов" />
            </Form.Item>
            <Form.Item data-easytag="id9-src/pages/Profile.jsx">
              <Button data-easytag="id10-src/pages/Profile.jsx" type="primary" htmlType="submit" loading={saving}>
                Сохранить изменения
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default Profile;
