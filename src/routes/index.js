import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { USER_ROLES } from '../constants';
import PrivateRoute from '../components/auth/PrivateRoute';

// Auth Pages
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';
import Profile from '../components/auth/Profile';

// Public Pages
import Home from '../components/pages/Home';
import About from '../components/pages/About';
import Contact from '../components/pages/Contact';
import ProductList from '../components/products/ProductList';
import ProductDetails from '../components/products/ProductDetails';

// Protected Pages
import Dashboard from '../components/dashboard/Dashboard';
import VendorDashboard from '../components/vendor/Dashboard';
import AdminDashboard from '../components/admin/Dashboard';
import Cart from '../components/cart/Cart';
import Checkout from '../components/checkout/Checkout';
import OrderHistory from '../components/orders/OrderHistory';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      
      {/* Protected Routes */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/vendor/dashboard"
        element={
          <PrivateRoute roles={[USER_ROLES.VENDOR]}>
            <VendorDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute roles={[USER_ROLES.ADMIN]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <OrderHistory />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;