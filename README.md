```markdown
# VelvetCoin - Luxury Brands Crypto Marketplace

A cutting-edge multi-vendor luxury brands e-commerce platform that exclusively accepts cryptocurrency payments (USDC). Built with React, TypeScript, Node.js, and MongoDB.

## 🌟 Features

### User Roles & Authentication
- **Customer**: Browse products, make purchases with USDC
- **Vendor**: Manage products, track orders, handle shipping
- **Admin**: Full platform management and oversight
- JWT-based authentication with email verification
- Secure password reset flow

### Core Functionality
- 💎 Luxury brand product listings with rich media support
- 💰 USDC cryptocurrency payments with Web3 integration
- 🛍️ Multi-vendor marketplace with vendor verification
- 📦 Order tracking and management
- 🔐 Role-based access control
- 📱 Responsive design
- 🖼️ AWS S3 image storage
- 📧 Email notifications

## 🚀 Tech Stack

### Frontend
- React 18.x with TypeScript
- Redux Toolkit for state management
- TailwindCSS for styling
- React Router v6
- Web3 integration (ethers.js)
- Axios for API requests

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT authentication
- AWS S3 for file storage
- Nodemailer for emails

## 📚 API Documentation

### Authentication Endpoints
```http
POST /api/auth/register
POST /api/auth/login
GET /api/auth/verify-email/:token
POST /api/auth/resend-verification
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
GET /api/auth/me
PUT /api/auth/profile
```

### Product Endpoints
```http
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
GET /api/products/search
```

### Order Endpoints
```http
POST /api/orders
GET /api/orders/user
GET /api/orders/vendor
GET /api/orders/:id
PATCH /api/orders/:id/status
```

### Vendor Endpoints
```http
POST /api/vendor/register
GET /api/vendor/stats
PUT /api/vendor/settings
GET /api/vendor/products
GET /api/vendor/orders
```

### Admin Endpoints
```http
GET /api/admin/stats
GET /api/admin/users
PATCH /api/admin/users/:userId/status
```

### Payment Endpoints
```http
POST /api/payments/process
GET /api/payments/:orderId/status
```

## 🛣️ Frontend Routes

### Public Routes
```
/                   - Home page
/about              - About page
/contact            - Contact page
/products           - Product listing
/products/:id       - Product details
/search             - Search results
```

### Auth Routes
```
/login              - Login page
/register           - Registration page
/forgot-password    - Password reset request
/reset-password     - Password reset
```

### Protected Routes
```
/profile            - User profile
/cart              - Shopping cart
/checkout          - Checkout process
/orders            - Order history
/orders/:id        - Order details
```

### Vendor Routes
```
/vendor/dashboard   - Vendor dashboard
/vendor/products    - Product management
/vendor/orders      - Order management
```

### Admin Routes
```
/admin/dashboard    - Admin dashboard
/admin/users        - User management
/admin/vendors      - Vendor management
/admin/products     - Product approval
```

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Email verification
- Protected API routes
- Input validation and sanitization
- File upload restrictions
- Rate limiting
- CORS configuration

## 💳 Payment Integration

VelvetCoin uses USDC (USD Coin) for all transactions:
- Web3 wallet integration
- Real-time payment verification
- Transaction history
- Automated payment processing
- Refund management

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/velvetcoin.git
cd velvetcoin
```

2. Install dependencies:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

3. Configure environment variables:
```bash
# Root directory .env
MONGODB_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_FROM=noreply@velvetcoin.com
FRONTEND_URL=http://localhost:3000

# AWS Configuration
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=your_region
AWS_BUCKET_NAME=your_bucket_name
```

4. Start the development servers:
```bash
# Start backend server
npm run server

# Start frontend server (in a new terminal)
cd client
npm start
```

## 📝 License

This project is licensed under the MIT License.
```