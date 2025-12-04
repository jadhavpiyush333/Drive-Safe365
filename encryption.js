const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

const encryptData = (data) => {
    const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

const decryptData = (encryptedData) => {
    const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = { encryptData, decryptData };
