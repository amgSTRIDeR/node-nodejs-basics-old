import zlib from 'zlib';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __fileToCompress = path.join(__dirname, 'files/fileToCompress.txt');
const __compressedFile = path.join(__dirname, 'files/archive.gz');

const compress = async () => {
    const gzip = zlib.createGzip();
    const source = fs.createReadStream(__fileToCompress);
    const destination = fs.createWriteStream(__compressedFile);

    source.pipe(gzip).pipe(destination);

    destination.on('finish', () => {
        console.log('File compressed');
    });
};

await compress();