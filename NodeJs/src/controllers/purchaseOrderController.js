const PurchaseOrder = require('../models/PurchaseOrder');

const addPurchaseOrder = async (req, res) => {
    try {
        const { purchaseOrderNumber, vendorName, vendorCompanyName, colour, orderDate, cost } = req.body;

        // Basic validation
        if (!purchaseOrderNumber || !vendorName || !vendorCompanyName || !orderDate || !cost) {
            return res.status(400).json({ message: 'Please provide all required fields: purchase order number, vendor name, vendor company name, order date, and cost' });
        }

        // Validating order date format
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(orderDate)) {
            return res.status(400).json({ message: 'Order date should be in YYYY-MM-DD format' });
        }

        // Validating cost to be a numeral
        if (isNaN(cost)) {
            return res.status(400).json({ message: 'Cost should be a number' });
        }

        // Checking if purchase order number already exists
        const existingPurchaseOrder = await PurchaseOrder.findOne({ purchaseOrderNumber });
        if (existingPurchaseOrder) {
            return res.status(400).json({ message: 'Purchase order with this number already exists' });
        }

        // Creating a new purchase order
        const newPurchaseOrder = new PurchaseOrder({
            purchaseOrderNumber,
            vendorName,
            vendorCompanyName,
            colour,
            orderDate,
            cost
        });

        await newPurchaseOrder.save();
        res.status(201).json({ message: 'Purchase order added successfully' });
    } catch (error) {
        console.error('Error adding purchase order:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const getPurchaseOrderByNumber = async (req, res) => {
    try {
        const { purchaseOrderNumber } = req.params;

        // Finding purchase order by number
        const purchaseOrder = await PurchaseOrder.findOne({ purchaseOrderNumber }).select('-_id -__v');

        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }

        res.status(200).json({ purchaseOrder });
    } catch (error) {
        console.error('Error retrieving purchase order:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const deletePurchaseOrderByNumber = async (req, res) => {
    try {
        const { purchaseOrderNumber } = req.params;

        // Finding and deleting purchase order by number
        const deletedPurchaseOrder = await PurchaseOrder.findOneAndDelete({ purchaseOrderNumber });

        if (!deletedPurchaseOrder) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }

        res.status(200).json({ message: 'Purchase order deleted successfully' });
    } catch (error) {
        console.error('Error deleting purchase order:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    addPurchaseOrder,
    getPurchaseOrderByNumber,
    deletePurchaseOrderByNumber
};
