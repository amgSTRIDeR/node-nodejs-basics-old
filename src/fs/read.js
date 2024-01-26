import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __filename = path.join(__dirname, 'files/fileToRead.txt');

const read = async () => {
    try {
        const content = await fs.promises.readFile(__filename, 'utf-8');
        console.log(content);
    } catch {
        throw new Error('FS operation failed');
    }
};

await read();