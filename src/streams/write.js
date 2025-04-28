import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import process from 'process';
import logColoredMessage from '../common/colors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    const writeStream = fs.createWriteStream(filePath);

    writeStream.on('open', () => {
        logColoredMessage('For exit press "ctrl + c"', 'yellow');
        logColoredMessage('Write the text in the terminal: ', 'green');
    })

    writeStream.on('finish', () => {
        logColoredMessage('Thank you', 'green');
    })

    writeStream.on('error', (err) => {
        logColoredMessage(`Some error ocurs: ${err}`, 'red');
    })

    process.stdin.pipe(writeStream);

    process.on('SIGINT', () => {
        logColoredMessage('\nThank you', 'green');
        process.exit();
    });


};

await write();