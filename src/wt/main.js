import os from 'os';
import { Worker } from 'worker_threads';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __workerFilename = path.resolve(__dirname, './worker.js');

const performCalculations = async () => {
    const cpuThreads = os.cpus().length;
    const promises = [];

    for (let i = 10; i < 10 + cpuThreads; i++) {
        const promise = new Promise((resolve, reject) => {
            // for random errors
            // const worker = new Worker(__workerFilename, { workerData: Math.random() > 0.5 ? i : 'g'});

            // for normal execution
            const worker = new Worker(__workerFilename, { workerData: i });

            worker.on('message', (result) => {
                resolve(result);
            });

            worker.on('error', (error) => {
                reject(error);
                console.log('error' + error);
            });
        })
        promises.push(promise);
    }

    await Promise.allSettled(promises).then((result) => {
        console.log(result.map((item) => item.value));
    });

};

await performCalculations();