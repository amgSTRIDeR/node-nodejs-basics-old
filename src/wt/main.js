import { Worker, isMainThread, workerData } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';
import logColoredMessage from '../common/colors.js';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerPath = path.join(__dirname, 'worker.js');

const performCalculations = async () => {
    const numberOfCores = os.cpus().length;
    let numberToCalculate = 10;
    const threadsResult = [];

    for (let i = numberToCalculate; i < numberToCalculate + numberOfCores; i++) {
        const worker = new Worker(workerPath, { workerData: { number: i } });

        worker.on('message', (result) => {
            threadsResult.push({ status: 'resolved', data: result });
        })

        worker.on('error', () => {
            threadsResult.push({ status: 'error', data: null });
        })

        if (i === numberToCalculate + numberOfCores - 1) {
            worker.on('exit', () => {
                logColoredMessage('Fibonacci results:', 'green');
                console.log(threadsResult)
            })
        }

    }
};

await performCalculations();