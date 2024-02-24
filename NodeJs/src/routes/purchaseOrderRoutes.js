const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');

// Add purchase order route
router.post('/add', purchaseOrderController.addPurchaseOrder);

// Get purchase order by number route
router.get('/:purchaseOrderNumber', purchaseOrderController.getPurchaseOrderByNumber);

// Delete purchase order by number route
router.delete('/:purchaseOrderNumber', purchaseOrderController.deletePurchaseOrderByNumber);

module.exports = router;
