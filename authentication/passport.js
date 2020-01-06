const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const { clientID, clientSecret, baseAPI } = require('../configuration');

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(new GoogleStrategy({
	clientID,
	clientSecret,
	callbackURL: `${baseAPI}/api/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
	try {
		const user = await User.findOne({ providerID: profile.id });
		if (user) {
			done(null, user);
		} else {
			const verifiedEmail = profile.emails.find(email => email.verified) || profile.emails[0]
			const userData = {
				email: verifiedEmail.value,
				provider: profile.provider,
				providerID: profile.id,
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				displayName: profile.displayName,
			}
			const newUser = new User(userData);	
			await newUser.save();
			done(null, newUser);
		}
	} catch (err) {
		done(null, false);
	}
}));