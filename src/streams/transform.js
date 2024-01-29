import { Transform } from 'stream';

const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
        const reversedChunk = chunk.toString().split('').reverse().join('');
        this.push(reversedChunk);
        callback();
    }
});


const transform = async () => {
    console.log('Type text to reverse it: ');
    process.stdin.pipe(reverseTransform).pipe(process.stdout);

    process.stdin.on('data', () => {
        console.log('\n\n Type text to reverse it:');
    });
};
await transform();