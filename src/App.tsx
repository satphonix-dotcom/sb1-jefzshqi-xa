import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import Layout from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;