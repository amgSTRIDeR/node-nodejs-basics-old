import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import logColoredMessage from '../common/colors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const wrongFileName = path.join(__dirname, 'files', 'wrongFileName.txt');
    const correctFileName = path.join(__dirname, 'files', 'properFilename.md');

    try {
        await fs.promises.access(wrongFileName);
    } catch (err) {
        logColoredMessage(err, 'yellow')
        logColoredMessage('FS operation failed', 'red');
        return;
    }

    try {
        await fs.promises.access(correctFileName);
        logColoredMessage(`File ${correctFileName} already exists`, 'yellow');
        logColoredMessage('FS operation failed', 'red');
        return;
    } catch (err) {
        if (err.code !== 'ENOENT') {
            logColoredMessage(err.message, 'yellow');
            logColoredMessage('FS operation failed', 'red');
            return;
        }
    }

    try {
        await fs.promises.rename(wrongFileName, correctFileName);
        logColoredMessage(`File ${wrongFileName} was successfully rename to ${correctFileName}`, 'green');
    } catch (err) {
        logColoredMessage(err.message, 'yellow');
        logColoredMessage('FS operation failed', 'red');
    }

};

await rename();