import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __filename = path.join(__dirname, 'files/fileToRemove.txt');

const remove = async () => {
    try {
        await fs.promises.rm(__filename);
        console.log(`File ${__filename} removed successfully.`);
    } catch {
        throw new Error('FS operation failed');
    }
};

await remove();