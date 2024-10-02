import fs from 'fs';
import CryptoJS from 'crypto-js';

export const encryptFilePassword = (filePath: string, password: string) => {
    const fileData = fs.readFileSync(filePath);
    const fileDataBase64 = fileData.toString('base64');
    const encryptedData = CryptoJS.AES.encrypt(fileDataBase64, password).toString();
    const encryptedFilePath = filePath + '.aes';
    fs.writeFileSync(encryptedFilePath, encryptedData);
    console.log('File đã được mã hóa:', encryptedFilePath);

    fs.unlinkSync(filePath);
    console.log('File gốc đã bị xóa:', filePath);
};

export const decryptFilePassWord = (filePath: string, password: string) => {
    const encryptedData = fs.readFileSync(filePath, 'utf8');
    const bytes = CryptoJS.AES.decrypt(encryptedData, password);
    const decryptedDataBase64 = bytes.toString(CryptoJS.enc.Utf8);
    const originalData = Buffer.from(decryptedDataBase64, 'base64');
    const originalFilePath = filePath.replace('.aes', '');
    fs.writeFileSync(originalFilePath, originalData);
    console.log('File đã được giải mã:', originalFilePath);

    fs.unlinkSync(filePath);
    console.log('File mã hóa đã bị xóa:', filePath);
}