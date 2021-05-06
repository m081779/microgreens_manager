const mongoose = require('mongoose')
const Schema = mongoose.Schema

const growCycleSchema = new Schema({
    seedType: {
        type: String,
    },
    variety: {
        type: String,
    },
    seedBatch: {
        type: Schema.Types.ObjectId,
        ref: "seedBatch",
    },
    numberOfTrays: {
        type: Number,
    },
    sowingWeight: {
        amount: {
            type: Number,
        },
        units: {
            type: String,
        },
    },
    seedMedium: {
        type: String,
    },
    soakDurationInHours: {
        type: Number,
    },
    germinationDurationInDays: {
        type: Number,
    },
    weightUsed: {
        type: String,
        default: 'paver'
    },
    didStackTrays: {
        type: Boolean,
        default: true
    },
    blackOutDurationInDays: {
        type: Number,
    },
    dailyLightDurationInHours: {
        type: Number,
        default: 16,
    },
    daysToHarvest: {
        type: Number,
    },
    harvestWeight: {
        amount: {
            type: Number,
        },
        units: {
            type: String,
        },
    },
    percentageIncreaseOverSeedWeight: {
        type: Number,
    },
    startDate: {
        type: Date,
        default: Date.now(),
    },
    harvestDate: {
        type: Date,
    },
    harvestMethod: {
        type: String,
        default: 'knife',
    },
    completed: {
        type: Boolean,
        default: false
    },
    dailyEnvironmentalConditions: [
        {
            type: Schema.Types.ObjectId,
            ref: "dailyEnvironmentalConditions"
        }
    ],
    dailyWaterUsage: [
        {
            type: Schema.Types.ObjectId,
            ref: "dailyWaterUsage"
        }
    ],
    dailyGrowNotes: [
        {
            type: Schema.Types.ObjectId,
            ref: "dailyGrowNotes"
        }
    ]
});

const GrowCycle = (module.exports = mongoose.model('GrowCycle', growCycleSchema))
