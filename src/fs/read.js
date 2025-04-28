import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import logColoredMessage from '../common/colors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    try {
        const fileText = await fs.promises.readFile(filePath);
        logColoredMessage(fileText, 'green');
    } catch (err) {
        if (err.code === 'ENOENT') {
            logColoredMessage(`Can't find ${filePath}`, 'yellow');
        }
        logColoredMessage('FS operation failed', 'red');
    }
};

await read();