const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PickupSchema = new Schema({
 pickupDate: Date,
 user: { type: Schema.Types.ObjectId, ref: 'User' },
 cooker: { type: Schema.Types.ObjectId, ref: 'User' }
});
PickupSchema.set('timestamps', true);
const Pickup = mongoose.model('Pickup', PickupSchema);
module.exports = Pickup;