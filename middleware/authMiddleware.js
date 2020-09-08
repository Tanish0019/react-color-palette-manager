const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configuration');

module.exports = {
	isAuthenticated: (req, res, next) => {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ success: false, message: 'Not Authenticated' });
		}
		try {
			const decoded = jwt.verify(token, jwtSecret);
			req.user = decoded;
			next();
		} catch (err) {
			// Incase of expired jwt or invalid token kill the token and clear the cookie
			res.clearCookie('token');
			return res.status(400).json({ success: false, message: err.message });
		}
	},
};
