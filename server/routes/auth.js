const express = require('express');
const User = require('../models/user'); // Import the User model
const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log("Request body received:", req.body);  // Log the incoming request
    
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already exists:', email);
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });

    // Save user to the database
    await newUser.save();
    console.log('User registered:', newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);  // Log detailed error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login existing user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    
    // If user is not found or password is incorrect
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Update the active status to 1 (active) when user successfully logs in
    user.active = 1;
    await user.save(); // Save the updated user to the database

    // Respond with a success message and user data
    res.status(200).json({
      message: 'Login successful',
      user: { username: user.username, email: user.email, active: user.active },
    });
    
  } catch (error) {
    console.error('Error during login:', error);  // Log detailed error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.post('/logout', async (req, res) => {
  try {
    // Set 'active' field to 0 for all users
    await User.updateMany({}, { active: 0 });

    res.status(200).json({ message: 'Logged out and all users are now inactive.' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Server error while logging out.' });
  }
});

router.get('/active-user', async (req, res) => {
  try {
    const activeUser = await User.findOne({ active: 1 });
    if (!activeUser) {
      return res.status(404).json({ message: 'No active user found.' });
    }
    res.status(200).json({ user: activeUser });
  } catch (error) {
    console.error('Error fetching active user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.put('/update-username', async (req, res) => {
  const { newUsername } = req.body; // Get the new username from the request body

  if (!newUsername) {
    return res.status(400).json({ message: 'New username is required.' });
  }

  try {
    // Find the currently active user (the user with active status of 1)
    const activeUser = await User.findOne({ active: 1 });

    if (!activeUser) {
      return res.status(404).json({ message: 'No active user found. Please log in first.' });
    }

    // Check if the new username is already taken by another user
    /*const existingUser = await User.findOne({ username: newUsername });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }*/

    // Update the username for the active user
    activeUser.username = newUsername;
    await activeUser.save(); // Save the updated user object

    res.status(200).json({ message: 'Username updated successfully!', user: activeUser });
  } catch (error) {
    console.error('Error updating username:', error);
    res.status(500).json({ message: 'Server error while updating username.' });
  }
});

module.exports = router;
