import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __scriptFilename = path.join(__dirname, 'files/script.js');

const spawnChildProcess = async (args) => {
    fork(__scriptFilename, args, {
        stdio: [process.stdin, process.stdout, process.stderr, 'ipc']
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess([1, 2, 3, 4, 5]);
