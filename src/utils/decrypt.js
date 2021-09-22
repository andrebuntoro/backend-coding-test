const CryptoJS = require('crypto-js');

const decrypt = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'your_secret_key');
    return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {
    decrypt
};
