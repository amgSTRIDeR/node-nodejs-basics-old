import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __filename = path.join(__dirname, 'files/fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const readable = fs.createReadStream(__filename);
    const hash = crypto.createHash('sha256');

    readable.on('data', (chunk) => {
        hash.update(chunk);
    });
    
    readable.on('end', () => {
        const hex = hash.digest('hex');
    
        console.log(hex);
    });
};

await calculateHash();