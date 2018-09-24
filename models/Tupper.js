const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tupperSchema = new Schema({
	tuppername: String,
	price: Number,
	quantity: Number,
	// tupperPic: String,
	// ingredients: [String],
	// allergens: {
	//   type: String,
	//   enum:['seefood','gluten','fish','egg','milk']
	// }
})
tupperSchema.set('timestamps', true);

const Tupper = mongoose.model('Tupper', tupperSchema);
module.exports = Tupper;