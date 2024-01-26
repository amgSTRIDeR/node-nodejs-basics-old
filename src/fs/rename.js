import * as path from 'path'
import { dirname } from 'path';
import * as fs from 'fs'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __wrongFilename = path.join(__dirname, 'files/wrongFilename.txt');
const __properFilename = path.join(__dirname, 'files/properFilename.md');

const rename = async () => {
    try {
        await fs.promises.access(__properFilename);
        throw new Error();
    } catch (err) {
        if (err.code !== 'ENOENT') throw new Error('FS operation failed');
    }

    try {
        await fs.promises.rename(__wrongFilename, __properFilename);
        console.log(`File renamed successfully.
        ${__wrongFilename}
        => 
        ${__properFilename}`);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await rename();