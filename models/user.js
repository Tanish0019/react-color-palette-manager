const mongoose = require('mongoose');
const { Schema } = mongoose;

// TODO: ADD DEFAULT PALETTES
const UserSchema = new Schema({
	email: String,
	password: String,
	firstName: String,
	lastName: String,
	displayName: String,
	provider: String,
	providerID: String,
	palettes: [
		{type: Schema.Types.ObjectId, ref: 'Palette'}
	]
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;