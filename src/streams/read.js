import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __filename = path.join(__dirname, 'files/fileToRead.txt');

const read = async () => {
    const readStream = fs.createReadStream(__filename);

    readStream.on('data', chunk => {
        process.stdout.write(chunk);
    });
};

await read();