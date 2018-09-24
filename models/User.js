const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, index: true },
	password: String,
	email: { type: String, index: true },
	// location: {
	// 	type: {	type: String },
	// 	coordinates: [ Number ]
	// },
	address: String,
	isCooker: {
		type: Boolean,
		default: false
	},
	// profilePic: String,
	// ranking: {type: Array, default: [3]}
});
// userSchema.index({
// 	location: "2dsphere"
// });
userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);
module.exports = User;