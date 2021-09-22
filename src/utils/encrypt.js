const CryptoJS = require('crypto-js');

const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, 'your_secret_key').toString();
};

module.exports = {
    encrypt
};
