import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import logColoredMessage from '../common/colors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const folderPath = path.join(__dirname, 'files');

const list = async () => {
    try {
        const filesNames = await fs.promises.readdir(folderPath);
        const filesList = [];

        for (const fileName of filesNames) {
            const fullPath = path.join(folderPath, fileName);
            const fileStats = await fs.promises.lstat(fullPath);
            const { name, ext } = path.parse(fileName);
            filesList.push({ name: name, ext: ext, size: `${fileStats.size} kB` });
        }

        console.group('Files List');
        console.table(filesList)
        console.groupEnd();
    } catch (err) {
        if (err.code === 'ENOENT') {
            logColoredMessage(`Folder ${folderPath} does not exist`, 'yellow');
        }
        logColoredMessage('FS operation failed', 'red');

    }
};

await list();