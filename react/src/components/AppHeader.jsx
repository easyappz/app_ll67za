import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

const { Header } = Layout;

const AppHeader = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const selectedKey = location.pathname.startsWith('/profile') ? '/profile' : location.pathname;

  return (
    <Header data-easytag="id1-src/components/AppHeader.jsx" style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', padding: 0 }}>
      <div data-easytag="id2-src/components/AppHeader.jsx" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 16px' }}>
        <div data-easytag="id3-src/components/AppHeader.jsx" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/" data-easytag="id4-src/components/AppHeader.jsx" style={{ color: 'white', fontWeight: 700, fontSize: 18, textDecoration: 'none' }}>Easyapp</Link>
          <Menu
            data-easytag="id5-src/components/AppHeader.jsx"
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={[
              { key: '/', label: <Link to="/" data-easytag="id6-src/components/AppHeader.jsx">Главная</Link> },
              ...(isAuthenticated ? [{ key: '/profile', label: <Link to="/profile" data-easytag="id7-src/components/AppHeader.jsx">Профиль</Link> }] : []),
            ]}
          />
        </div>
        <div data-easytag="id8-src/components/AppHeader.jsx" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {!isAuthenticated ? (
            <>
              <Link to="/login" data-easytag="id9-src/components/AppHeader.jsx"><Button type="default">Войти</Button></Link>
              <Link to="/register" data-easytag="id10-src/components/AppHeader.jsx"><Button type="primary">Зарегистрироваться</Button></Link>
            </>
          ) : (
            <Button data-easytag="id11-src/components/AppHeader.jsx" onClick={logout} danger type="primary">Выйти</Button>
          )}
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
