import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import logColoredMessage from '../common/colors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = 'fileToRemove.txt';
const filePath = path.join(__dirname, 'files', fileName);

const remove = async () => {
    try {
        await fs.promises.rm(filePath);
        logColoredMessage(`File ${fileName} has been deleted`, 'green');
    } catch (err) {
        if(err.code === 'ENOENT') {
            logColoredMessage(`File ${filePath} does not exist`, 'yellow');
        }
        logColoredMessage('FS operation failed', 'red');
    }
};

await remove();