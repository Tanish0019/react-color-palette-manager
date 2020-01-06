module.exports = {
	clientID: process.env['GOOGLE_CLIENT_ID'],
	clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
	baseAPI: process.env['BASE_API'],
	mongodbURI: process.env['MONGODB_URI'],
	clientHomeUri: process.env['CLIENT_HOME_URI'],
	sessionSecret: process.env['SESSION_SECRET']
}