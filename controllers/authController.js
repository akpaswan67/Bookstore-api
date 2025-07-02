const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const users = await userModel.getAllUsers();
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), email, password: hashedPassword };

  users.push(newUser);
  await userModel.saveUsers(users);

  // Save the new user to the file
  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const users = await userModel.getAllUsers();
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Check if user exists and password matches
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  res.json({ token });
};