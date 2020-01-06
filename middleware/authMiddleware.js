module.exports = {
	isAuthenticated: (req, res, next) => {
		if (req.user){
			next()
		} else {
			return res.status(401).json({success: false, message: "Not Authenticated"});
		}
	}
};

