import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AuthProvider from './components/auth/AuthProvider';
import AppRoutes from './routes';
import Layout from './components/layout/Layout';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;