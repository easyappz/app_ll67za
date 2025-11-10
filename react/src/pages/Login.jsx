import React, { useState } from 'react';
import { Button, Card, Form, Input, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth.js';
import { useAuth } from '../auth/AuthContext.jsx';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await loginUser(values);
      login(data);
      message.success('Вы успешно вошли');
      navigate('/profile');
    } catch (err) {
      const data = err?.response?.data;
      if (typeof data === 'string') {
        message.error(data);
      } else if (data && typeof data === 'object') {
        const msg = data?.detail || data?.message || 'Неверная почта или пароль.';
        message.error(msg);
      } else {
        message.error('Ошибка входа');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-src/pages/Login.jsx" style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <Card data-easytag="id2-src/pages/Login.jsx" style={{ maxWidth: 520, width: '100%' }}>
        <Title level={3} data-easytag="id3-src/pages/Login.jsx">Авторизация</Title>
        <Form data-easytag="id4-src/pages/Login.jsx" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Почта"
            name="email"
            rules={[
              { required: true, message: 'Укажите почту' },
              { type: 'email', message: 'Некорректный email' }
            ]}
          >
            <Input data-easytag="id5-src/pages/Login.jsx" type="email" placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password data-easytag="id6-src/pages/Login.jsx" placeholder="••••••••" />
          </Form.Item>

          <Form.Item data-easytag="id7-src/pages/Login.jsx">
            <Button data-easytag="id8-src/pages/Login.jsx" type="primary" htmlType="submit" loading={loading} block>
              Войти
            </Button>
          </Form.Item>

          <div data-easytag="id9-src/pages/Login.jsx" style={{ textAlign: 'center' }}>
            Нет аккаунта? <Link to="/register" data-easytag="id10-src/pages/Login.jsx">Зарегистрироваться</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
