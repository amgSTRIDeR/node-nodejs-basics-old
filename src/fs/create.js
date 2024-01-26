import * as path from 'path'
import { dirname } from 'path';
import * as fsPromises from 'fs/promises'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __filename = path.join(__dirname, 'files/fresh.txt');

const create = async () => {

    try {
        await fsPromises.writeFile(__filename, 'I am fresh and young', { flag: 'wx' });
        console.log(`File ${__filename} created successfully.`);
    }
    catch (err) {
        throw new Error('FS operation failed');
    }

};

await create();