import fs from 'fs';
import NodeRSA from 'node-rsa';

// Mã hóa file
export const encryptFileFace = (filePath: string, publicKeyString: string) => {
    const fileData = fs.readFileSync(filePath);
    const fileDataBase64 = fileData.toString('base64');

    // Mã hóa dữ liệu bằng khóa công khai
    const key = new NodeRSA(publicKeyString);
    const encryptedData = key.encrypt(fileDataBase64, 'base64');

    const encryptedFilePath = filePath + '.rsa';
    fs.writeFileSync(encryptedFilePath, encryptedData);
    console.log('File đã được mã hóa:', encryptedFilePath);

    fs.unlinkSync(filePath);
    console.log('File gốc đã bị xóa:', filePath);
};

export const decryptFileFace = (filePath: string, privateKeyString: string) => {
    const encryptedData = fs.readFileSync(filePath, 'utf8');

    // Giải mã dữ liệu bằng khóa riêng
    const key = new NodeRSA(privateKeyString);
    const decryptedDataBase64 = key.decrypt(encryptedData, 'utf8');

    const originalData = Buffer.from(decryptedDataBase64, 'base64');
    const originalFilePath = filePath.replace('.rsa', '');
    fs.writeFileSync(originalFilePath, originalData);
    console.log('File đã được giải mã:', originalFilePath);

    fs.unlinkSync(filePath);
    console.log('File mã hóa đã bị xóa:', filePath);
};