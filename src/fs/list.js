import * as path from 'path'
import { dirname } from 'path';
import * as fs from 'fs'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __path = path.join(__dirname, 'files');

const list = async () => {
    try {
        const files = await fs.promises.readdir(__path);
        for (const file of files) console.log(file);
    } catch {
        throw new Error('FS operation failed');
    }
};

await list();