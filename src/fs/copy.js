import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import logColoredMessage from '../common/colors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files_copy');

const createDirectory = async () => {
    try {
        await fs.promises.mkdir(destDir);
        logColoredMessage(`The directory ${destDir} has been created`, `green`);
    } catch (err) {
        if (err) {
            if (err.code === 'EEXIST') {
                throw new Error(`The directory ${destDir} already exists`);
            } else {
                throw new Error(err);
            }
        }
    }
}

const readDirectory = async () => {
    try {
        const files = await fs.promises.readdir(sourceDir);
        return files;
    } catch (err) {
        if (err) {
            if (err.code === 'ENOENT') {
                throw new Error(`The directory ${sourceDir} does not exist`);
            } else {
                throw new Error(err);
            }
        }
    }
}

const copyFiles = async (filesToCopy) => {
    try {
        for (const key in filesToCopy) {
            await copyFile(filesToCopy[key]);
        }
        logColoredMessage(`Files ${filesToCopy} were successfully copied`, 'green');
    } catch (err) {
        throw new Error(err);
    }
}

const copyFile = async (fileName) => {
    try {
        const sourceFileName = path.join(sourceDir, fileName);
        const destFileName = path.join(destDir, fileName);

        await fs.promises.copyFile(sourceFileName, destFileName);
    } catch (err) {
        throw new Error(err);
    }
}

const copy = async () => {
    try {
        await createDirectory();
        const filesToCopy = await readDirectory();
        if (filesToCopy.length) {
            await copyFiles(filesToCopy);
        } else {
            logColoredMessage('No files to copy', 'yellow');
        }

    } catch (err) {
        logColoredMessage(err, 'yellow')
        logColoredMessage('FS operation failed', 'red')
    }
};



await copy();
