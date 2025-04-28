import path from 'path';
import { fileURLToPath } from 'url';
import logColoredMessage from '../common/colors.js';
import fs from 'fs';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToCompressPath = path.join(__dirname, 'files', 'fileToCompress.txt');
const compressedFilePath = path.join(__dirname, 'files', 'archive.gz');


const compress = async () => {
    const zlibInfo = zlib.createGzip();

    const readableStream = fs.createReadStream(fileToCompressPath);
    const writableStream = fs.createWriteStream(compressedFilePath);

    readableStream.pipe(zlibInfo).pipe(writableStream);

    readableStream.on('end', () => {
        logColoredMessage(`File ${fileToCompressPath} has been compressed to ${compressedFilePath}`, 'green');
    })

    readableStream.on('error', (err) => {
        logColoredMessage(`Error occured: ${err}`, 'red');
    })
};

await compress();