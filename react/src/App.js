import React, { useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

const { Content, Footer } = Layout;

function App() {
  useEffect(() => {
    const pages = ['/', '/register', '/login', '/profile'];
    if (typeof window !== 'undefined' && typeof window.handleRoutes === 'function') {
      window.handleRoutes(pages);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Layout data-easytag="id1-src/App.js" style={{ minHeight: '100vh' }}>
        <AppHeader />
        <Content data-easytag="id2-src/App.js" style={{ padding: '24px 16px', display: 'flex', justifyContent: 'center' }}>
          <div data-easytag="id3-src/App.js" style={{ width: '100%', maxWidth: 1200 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Content>
        <Footer data-easytag="id4-src/App.js" style={{ textAlign: 'center' }}>Easyapp © {new Date().getFullYear()}</Footer>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
