import React, { useState } from 'react';
import { Button, Card, Form, Input, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth.js';

const { Title } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await registerUser(values);
      message.success('Регистрация прошла успешно');
      navigate('/login');
    } catch (err) {
      const data = err?.response?.data;
      if (typeof data === 'string') {
        message.error(data);
      } else if (data && typeof data === 'object') {
        const messages = Object.entries(data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n');
        message.error(messages || 'Ошибка регистрации');
      } else {
        message.error('Ошибка регистрации');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-src/pages/Register.jsx" style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <Card data-easytag="id2-src/pages/Register.jsx" style={{ maxWidth: 520, width: '100%' }}>
        <Title level={3} data-easytag="id3-src/pages/Register.jsx">Регистрация</Title>
        <Form
          data-easytag="id4-src/pages/Register.jsx"
          name="register"
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
        >
          <Form.Item
            label="Почта"
            name="email"
            rules=[
              { required: true, message: 'Укажите почту' },
              { type: 'email', message: 'Некорректный email' }
            ]
          >
            <Input data-easytag="id5-src/pages/Register.jsx" type="email" placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Имя"
            name="first_name"
            rules={[{ required: true, message: 'Укажите имя' }]}
          >
            <Input data-easytag="id6-src/pages/Register.jsx" placeholder="Иван" />
          </Form.Item>

          <Form.Item
            label="Фамилия"
            name="last_name"
            rules={[{ required: true, message: 'Укажите фамилию' }]}
          >
            <Input data-easytag="id7-src/pages/Register.jsx" placeholder="Иванов" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }, { min: 8, message: 'Минимум 8 символов' }]}
          >
            <Input.Password data-easytag="id8-src/pages/Register.jsx" placeholder="••••••••" />
          </Form.Item>

          <Form.Item data-easytag="id9-src/pages/Register.jsx">
            <Button data-easytag="id10-src/pages/Register.jsx" type="primary" htmlType="submit" loading={loading} block>
              Создать аккаунт
            </Button>
          </Form.Item>

          <div data-easytag="id11-src/pages/Register.jsx" style={{ textAlign: 'center' }}>
            Уже есть аккаунт? <Link to="/login" data-easytag="id12-src/pages/Register.jsx">Войти</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
