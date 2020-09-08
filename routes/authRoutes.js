const router = require('express').Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post('/google-login', authController.googleLogin);

router.get('/user', isAuthenticated, authController.authenticatedUser);

router.get('/logout', isAuthenticated, authController.logout);

module.exports = router;
