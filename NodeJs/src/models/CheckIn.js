const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    deliveryChallanNumber: {
        type: String,
        required: true
    },
    purchaseOrderNumber: {
        type: String,
        required: true
    },
    checkInTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    isCheckedOut: {
        type: Boolean,
        default: false
    }
});

checkInSchema.index({ id: 1, username: 1 }, { unique: true });

const CheckIn = mongoose.model('CheckIn', checkInSchema);

module.exports = CheckIn;
