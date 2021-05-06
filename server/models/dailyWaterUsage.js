const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dailyWaterUsageSchema = new Schema({
    wateringMethod: {
        type: String,
    },
    dateTime: {
        type: Date,
        default: Date.now(),
    },
    quantity: {
        type: Number,
    },
    units: {
        type: String,
    },
    hadNutrients: {
        type: Boolean,
    },
    notes: [String]
});

const DailyWaterUsage = (module.exports = mongoose.model('DailyWaterUsage', dailyWaterUsageSchema))
