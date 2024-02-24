const User = require('../models/User');
const CheckIn = require('../models/CheckIn');
const PurchaseOrder = require('../models/PurchaseOrder');

const checkIn = async (req, res) => {
    try {
        const { username, vehicleNumber, deliveryChallanNumber, purchaseOrderNumber } = req.body;

        // Basic validation
        if (!username || !vehicleNumber || !deliveryChallanNumber || !purchaseOrderNumber) {
            return res.status(400).json({ message: 'Please provide all required fields: userName, vehicleNumber, deliveryChallanNumber, and purchaseOrderNumber' });
        }

        // Finding the user by userName
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Checking if the purchase order exists
        const purchaseOrderExists = await PurchaseOrder.findOne({ purchaseOrderNumber });

        if (!purchaseOrderExists) {
            return res.status(400).json({ message: 'Purchase order not found' });
        }

        // Finding the latest check-in record for the user
        const latestCheckIn = await CheckIn.findOne({ username }).sort({ id: -1 });

        // Generating the next ID
        const nextId = latestCheckIn ? latestCheckIn.id + 1 : 1;

        // Creating a new check-in record with the next ID
        const newCheckIn = new CheckIn({
            id: nextId, // Next ID
            username,
            vehicleNumber,
            deliveryChallanNumber,
            purchaseOrderNumber,
            checkInTime: new Date() 
        });

        await newCheckIn.save();
        res.status(201).json({ message: 'Check-in successful' });
    } catch (error) {
        console.error('Error checking in:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const checkOut = async (req, res) => {
    try {
        const { id, username } = req.body;

        // Basic validation
        if (!id || !username) {
            return res.status(400).json({ message: 'Please provide both id and username' });
        }

        // Finding the check-in record to update
        const checkIn = await CheckIn.findOne({ id, username });

        if (!checkIn) {
            return res.status(404).json({ message: 'Check-in record not found' });
        }

        // Checking if the check-in record is already checked out
        if (checkIn.isCheckedOut) {
            return res.status(409).json({ message: 'Check-in record already checked out' });
        }

        checkIn.isCheckedOut = true;
        await checkIn.save();

        res.status(200).json({ message: 'Check-out successful' });
    } catch (error) {
        console.error('Error checking out:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


const getAllCheckInsForUser = async (req, res) => {
    try {
        const { username } = req.params;

        // Finding the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Finingd check-in records for the user
        const checkIns = await CheckIn.find({ username });

        if (checkIns.length === 0) {
            return res.status(200).json({ message: 'No check-ins found for the user' });
        }

        // Enriching check-ins with purchase order information and including isCheckedOut field
        const enrichedCheckIns = await Promise.all(checkIns.map(async (checkIn) => {
            const purchaseOrder = await PurchaseOrder.findOne({ purchaseOrderNumber: checkIn.purchaseOrderNumber });
            const { id, username, vehicleNumber, deliveryChallanNumber, purchaseOrderNumber, checkInTime } = checkIn;

            // Checking if the check-in has been checked out
            const isCheckedOut = checkIn.isCheckedOut || false;

            return {
                id: id,
                username,
                vehicleNumber,
                deliveryChallanNumber,
                purchaseOrderNumber,
                checkInTime,
                isCheckedOut, 
                purchaseOrder: purchaseOrder ? {
                    vendorName: purchaseOrder.vendorName,
                    vendorCompanyName: purchaseOrder.vendorCompanyName,
                    colour: purchaseOrder.colour,
                    cost: purchaseOrder.cost
                } : null
            };
        }));

        res.status(200).json({ checkIns: enrichedCheckIns });
    } catch (error) {
        console.error('Error retrieving check-ins:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateCheckIn = async (req, res) => {
    try {
        const { id, username, vehicleNumber, deliveryChallanNumber, purchaseOrderNumber } = req.body;

        // Basic validation
        if (!id || !username || !vehicleNumber || !deliveryChallanNumber || !purchaseOrderNumber) {
            return res.status(400).json({ message: 'Please provide all required fields: id, username, vehicleNumber, deliveryChallanNumber, and purchaseOrderNumber' });
        }

        // Finding the check-in record to update
        const checkIn = await CheckIn.findOne({ id, username });

        if (!checkIn) {
            return res.status(404).json({ message: 'Check-in record not found' });
        }

        if (checkIn.isCheckedOut) {
            return res.status(403).json({ message: 'Check-in record already checked out, update not allowed' });
        }

        // Updating the check-in record
        const updatedCheckIn = await CheckIn.findOneAndUpdate(
            { id, username },
            { $set: { vehicleNumber, deliveryChallanNumber, purchaseOrderNumber } },
            { new: true }
        );

        res.status(200).json({ message: 'Check-in record updated successfully'});
    } catch (error) {
        console.error('Error updating check-in record:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    checkIn,
    checkOut,
    getAllCheckInsForUser,
    updateCheckIn
};
