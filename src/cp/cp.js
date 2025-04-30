import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process'
import logColoredMessage from '../common/colors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const child = spawn('node', [filePath, ...args.map(String)]);

    child.stdin.write(JSON.stringify(args))
    child.stdin.end();

    child.stdout.on('data', (data) => {
        logColoredMessage(data, 'green');
    });

    child.stderr.on('data', (data) => {
        logColoredMessage(`Error: ${data}`, 'red');
    });

    child.on('close', (code) => {
        logColoredMessage(`Process ends with code: ${code}`, 'yellow');
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess([1, 2, 3, 4, 5]);
