const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	location: {
		type: {	type: String },
		coordinates: [ Number ]
	},
	address: String,
	isCooker: {
		type: Boolean,
		default: false
	},
	// profilePic: String,
	// ranking: {type: Array, default: [3]}
});
userSchema.index({
	location: "2dsphere"
});
userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);
module.exports = User;