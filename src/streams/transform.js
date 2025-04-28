import process from 'process';
import logColoredMessage from '../common/colors.js';


const transform = async () => {
    logColoredMessage('For exit press "ctrl + c"', 'yellow');
    logColoredMessage('Write text to reverse:', 'green');

    process.stdin.on('data', (chunk) => {

        process.stdout.write(`\nReversed text: ${chunk.toString().split('').reverse().join('')}\n\n`);
    })

    process.on('SIGINT', () => {
        logColoredMessage('\nSee you', 'green');
        process.exit();
    });
};

await transform();