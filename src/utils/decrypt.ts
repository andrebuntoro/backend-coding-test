import CryptoJS from 'crypto-js';

const decrypt = (encryptedData: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'your_secret_key');
    return bytes.toString(CryptoJS.enc.Utf8);
};

export default decrypt;
