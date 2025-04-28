import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import logColoredMessage from '../common/colors.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const fileName = 'fresh.txt';
const fileText = 'I am fresh and young';

const filePath = path.join(__dirname, 'files', fileName);

const create = async () => {
    try {
        await fs.promises.writeFile(filePath, fileText, {flag: 'wx'});
        logColoredMessage(`The file '${fileName}' has been created`, 'green');
    } catch (err) {
        if (err.code === 'EEXIST') {
            logColoredMessage(`FS operation failed`, 'red');
        } else {
            logColoredMessage(err, 'red')
        }
    }
};

await create();