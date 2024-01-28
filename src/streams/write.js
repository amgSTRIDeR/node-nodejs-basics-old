import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __toReadFilename = path.join(__dirname, 'files/fileToRead.txt');
const __toWriteFilename = path.join(__dirname, 'files/fileToWrite.txt');

const write = async () => {
    const readStream = fs.createReadStream(__toReadFilename);
    const writeStream = fs.createWriteStream(__toWriteFilename);

    readStream.on('data', chunk => {
        writeStream.write(chunk);
    });

    readStream.on('end', () => {
        writeStream.end();
        console.log('\nDone');
    });
};

await write();