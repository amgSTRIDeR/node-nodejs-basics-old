import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __fileToDecompress = path.join(__dirname, 'files/archive.gz');
const __decompressedFile = path.join(__dirname, 'files/fileToCompress.txt');

const decompress = async () => {
    const gunzip = zlib.createGunzip();

    const source = fs.createReadStream(__fileToDecompress);
    const destination = fs.createWriteStream(__decompressedFile);

    source.pipe(gunzip).pipe(destination);

    destination.on('finish', () => {
        console.log('File decompressed');
    })
};

await decompress();