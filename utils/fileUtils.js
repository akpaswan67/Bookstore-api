const fs = require('fs').promises;

exports.readData = async (file) => {
  try {
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
};

exports.writeData = async (file, data) => {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
};