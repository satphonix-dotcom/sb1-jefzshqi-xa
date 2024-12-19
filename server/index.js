const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('./middleware/cors');
const { apiLimiter } = require('./middleware/rateLimiter');
const sanitizeMiddleware = require('./middleware/sanitize');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/database');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors);
app.use(sanitizeMiddleware);
app.use('/api/', apiLimiter);

// Logging
app.use(morgan('dev'));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/api/auth.routes'));
app.use('/api/products', require('./routes/api/product.routes'));
app.use('/api/orders', require('./routes/api/order.routes'));
app.use('/api/payments', require('./routes/api/payment.routes'));
app.use('/api/upload', require('./routes/api/upload.routes'));
app.use('/api/vendor', require('./routes/api/vendor.routes'));
app.use('/api/admin', require('./routes/api/admin.routes'));

// Error handling
app.use(errorHandler);

// Database connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;