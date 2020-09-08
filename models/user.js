const mongoose = require('mongoose');
const { Schema } = mongoose;

// TODO: ADD DEFAULT PALETTES
const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
	},
	auth_type: {
		type: String,
		default: 'google',
		required: true,
	},
	palettes: [{ type: Schema.Types.ObjectId, ref: 'Palette' }],
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
