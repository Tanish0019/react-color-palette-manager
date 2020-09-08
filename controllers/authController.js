const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const { googleClientID, jwtSecret } = require('../configuration');

const client = new OAuth2Client(googleClientID);

module.exports = {
	googleLogin: async (req, res, next) => {
		const { tokenId } = req.body;
		try {
			const response = await client.verifyIdToken({ idToken: tokenId, audience: googleClientID });
			const { email, name, picture, email_verified } = response.payload;
			if (email_verified) {
				let user = await User.findOne({ email });
				if (!user) {
					user = User({ name, email, picture });
					await user.save();
				}
				const jwtToken = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' });
				res.cookie('token', jwtToken, { httpOnly: true }).json({
					success: true,
					user: {
						name,
						email,
						picture,
					},
				});
			}
		} catch (err) {
			next(err);
		}
	},

	authenticatedUser: async (req, res, next) => {
		try {
			const user = await User.findById(req.user._id).select('name email picture');
			if (!user) {
				return res.status(404).json({
					success: false,
					message: 'User not found!',
				});
			}

			res.status(200).json({
				success: true,
				user,
			});
		} catch (err) {
			next(err);
		}
	},

	logout: (req, res) => {
		req.session.destroy();
		res.clearCookie('token');
		return res.status(200).json({ success: true, message: 'Logged Out' });
	},
};
