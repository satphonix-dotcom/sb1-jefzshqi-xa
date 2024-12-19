```javascript
const { USER_ROLES } = require('../constants');

const admin = (req, res, next) => {
  if (req.user.role !== USER_ROLES.ADMIN) {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
  next();
};

module.exports = admin;
```