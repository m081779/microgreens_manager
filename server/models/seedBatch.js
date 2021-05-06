const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seedBatchSchema = new Schema({
	purchasedFrom: {
		type: String,
	},
	brand: {
		type: String,
	},
	seedType: {
		type: String,
	},
	variety: {
		type: String,
	},
	purchaseDate: {
		type: Date,
	},
	shippingTimeInDays: {
		type: Number,
	},
	quantity: {
		amount: {
			type: Number,
		},
		units: {
			type: String,
		},
	},
	totalPrice: {
		type: Number,
	},
	pricePerPound: {
		type: Number,
	},
	germinationtestDate: {
		type: Date,
	},
	germinationPercent: {
		type: Number,
	},
});

const SeedBatch = module.exports = mongoose.model('SeedBatch', seedBatchSchema);