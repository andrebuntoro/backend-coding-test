import CryptoJS from 'crypto-js';

const encrypt = (data: string): string => {
    return CryptoJS.AES.encrypt(data, 'your_secret_key').toString();
};

export default encrypt;
