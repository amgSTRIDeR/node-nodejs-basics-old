import path from 'path';
import { fileURLToPath } from 'url';
import logColoredMessage from '../common/colors.js';
import fs from 'fs';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToDecompressPath = path.join(__dirname, 'files', 'archive.gz');
const decompressedFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');



const decompress = async () => {
        const zlibInfo = zlib.createUnzip();
    
        const readableStream = fs.createReadStream(fileToDecompressPath);
        const writableStream = fs.createWriteStream(decompressedFilePath);
    
        readableStream.pipe(zlibInfo).pipe(writableStream);
    
        readableStream.on('end', () => {
            logColoredMessage(`File ${fileToDecompressPath} has been decompressed to ${decompressedFilePath}`, 'green');
        })
    
        readableStream.on('error', (err) => {
            logColoredMessage(`Error occured: ${err}`, 'red');
        })
};

await decompress();