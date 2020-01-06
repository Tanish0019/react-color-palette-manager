const router = require("express").Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const { isAuthenticated } = require("../middleware/authMiddleware");
const { clientHomeUri } = require('../configuration');

router.get("/google",
	passport.authenticate("google", {
		scope: [
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email"
		]
	})
);

router.get("/google/callback", passport.authenticate('google', { failureRedirect: clientHomeUri, successRedirect: clientHomeUri }));

router.get("/user", isAuthenticated, authController.authenticatedUser);

router.get('/logout', isAuthenticated, authController.logout);

module.exports = router;