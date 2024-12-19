const sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const sanitizeMiddleware = [
  sanitize(), // Prevent NoSQL injection
  xss(), // Prevent XSS attacks
];

module.exports = sanitizeMiddleware;