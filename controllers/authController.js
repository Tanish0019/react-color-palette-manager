const User = require('../models/user');
const { clientHomeUri } = require('../configuration');

module.exports = {
	
	authenticatedUser: (req, res, next) => {
		res.status(200).json({
			success: true,
			user: req.user
		});
	},

	logout: (req, res, next) => {
		req.session.destroy();
		res.clearCookie("connect.sid");
		return res.status(200).json({ success: true, message: "Logged Out" });
	}
};