module.exports = {
	origin: process.env['ORIGIN'],
	mongodbURI: process.env['MONGODB_URI'],
	jwtSecret: process.env['JWT_SECRET'],
	sessionSecret: process.env['SESSION_SECRET'],
	googleClientID: process.env['GOOGLE_CLIENT_ID'],
	googleClientSecret: process.env['GOOGLE_CLIENT_SECRET'],
};
