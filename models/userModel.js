const { readData, writeData } = require('../utils/fileUtils');
const USERS_FILE = './data/users.json';

exports.getAllUsers = () => readData(USERS_FILE);

exports.saveUsers = (users) => writeData(USERS_FILE, users);
