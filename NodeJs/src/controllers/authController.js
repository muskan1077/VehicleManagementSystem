const User = require('../models/User');

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide username, email, and password' });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Checking if user with email or username already exists
        const existingUserEmail = await User.findOne({ email });
        const existingUserUsername = await User.findOne({ username });

        if (existingUserEmail || existingUserUsername) {
            return res.status(400).json({ message: 'User with this email or username already exists' });
        }

        // Creating a new user
        const newUser = new User({
            username,
            email,
            password
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        // Finding user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Checking password
        if (password !== user.password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        // Returning the username upon successful login
        res.status(200).json({ message: 'Login successful', username: user.username });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    signup,
    login
};
