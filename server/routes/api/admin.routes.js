```javascript
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const {
  getAdminStats,
  getUsers,
  updateUserStatus
} = require('../../controllers/admin.controller');

// All routes require authentication and admin role
router.use(auth, admin);

router.get('/stats', getAdminStats);
router.get('/users', getUsers);
router.patch('/users/:userId/status', updateUserStatus);

module.exports = router;
```