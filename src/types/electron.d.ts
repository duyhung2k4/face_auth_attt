declare global {
    interface Window {
        electron: {
            encryptFilePassword: (filePath: string, password: string) => Promise<void>;
            decryptFilePassword: (filePath: string, password: string) => Promise<void>;
            encryptFileFace: (filePath: string, key: string) => Promise<void>;
            decryptFileFace: (filePath: string, key: string) => Promise<void>;
        };
    }
}

// Chắc chắn rằng module này được xuất hiện.
export {};