const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const purchaseOrderRoutes = require('./src/routes/purchaseOrderRoutes');
const transactionsRoutes = require('./src/routes/transactionsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

// Enabling CORS for all routes, can be removed when not required
app.use(cors());

// Connecting to MongoDB
mongoose.connect('mongodb+srv://muskan1077gupta:gupta1077@cluster0.xzrilaw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err.message));

app.use(bodyParser.json());

// Routes
app.use('/user', authRoutes);
app.use('/purchase-order', purchaseOrderRoutes);
app.use('/transactions', transactionsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
