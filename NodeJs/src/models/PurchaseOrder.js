const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
    purchaseOrderNumber: {
        type: String,
        required: true,
        unique: true
    },
    vendorName: {
        type: String,
        required: true
    },
    vendorCompanyName: {
        type: String,
        required: true
    },
    colour: String,
    orderDate: {
        type: String,
        require: true
    },
    cost: {
        type: Number,
        required: true
    }
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;
