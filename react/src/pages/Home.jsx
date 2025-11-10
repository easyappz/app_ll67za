import React from 'react';
import { Card, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

const { Title, Paragraph } = Typography;

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div data-easytag="id1-src/pages/Home.jsx" style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <Card data-easytag="id2-src/pages/Home.jsx" style={{ maxWidth: 720, width: '100%' }}>
        <Title level={2} data-easytag="id3-src/pages/Home.jsx">Добро пожаловать!</Title>
        {!isAuthenticated ? (
          <>
            <Paragraph data-easytag="id4-src/pages/Home.jsx">Пожалуйста, войдите в аккаунт или зарегистрируйтесь, чтобы продолжить.</Paragraph>
            <div data-easytag="id5-src/pages/Home.jsx" style={{ display: 'flex', gap: 12 }}>
              <Link to="/login" data-easytag="id6-src/pages/Home.jsx"><Button type="primary">Войти</Button></Link>
              <Link to="/register" data-easytag="id7-src/pages/Home.jsx"><Button>Зарегистрироваться</Button></Link>
            </div>
          </>
        ) : (
          <>
            <Paragraph data-easytag="id8-src/pages/Home.jsx">Вы вошли как <b>{user?.email}</b>.</Paragraph>
            <div data-easytag="id9-src/pages/Home.jsx" style={{ display: 'flex', gap: 12 }}>
              <Link to="/profile" data-easytag="id10-src/pages/Home.jsx"><Button type="primary">Перейти в профиль</Button></Link>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Home;
