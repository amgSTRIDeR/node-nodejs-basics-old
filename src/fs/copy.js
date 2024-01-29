import * as path from 'path'
import { dirname } from 'path';
import * as fs from 'fs'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const copy = async () => {
    
    fs.readdir(path.join(__dirname, 'files'), (err, files) => {
        if (err) throw new Error ('FS operation failed');
        
        fs.mkdir(path.join(__dirname, 'files_copy'), (err) => {
            if (err) throw new Error ('FS operation failed');
            console.log('Directory created successfully.');
        });

        files.forEach(file => {
            fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files_copy', file), (err) => {
                if (err) throw new Error ('FS operation failed');
                console.log(`File ${file} copied successfully.`);
            });
        });
    });
};

await copy();
