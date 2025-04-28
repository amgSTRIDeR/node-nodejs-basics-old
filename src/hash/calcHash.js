import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';
import logColoredMessage from '../common/colors.js';

const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName);
const filePath = path.join(__dirName, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const readStream = fs.createReadStream(filePath);
    const hash = crypto.createHash('sha256');

    readStream.on('data', (chunk) => {
        hash.update(chunk);
    })

    readStream.on('end', () => {
        logColoredMessage(`Hash is ${hash.digest('hex')}`, 'green');
    })

    readStream.on('error', (err) => {
        logColoredMessage(`Oops, there are some error: ${err}`, 'red');
    })


};

await calculateHash();