import logColoredMessage from "../common/colors.js";

const parseArgs = () => {
    const argsArray = (process.argv).slice(2);
    const processedArgsArray = [];

    for (let i = 0; i < argsArray.length; i += 2) {
        processedArgsArray.push(`${argsArray[i].slice(2)} is ${argsArray[i + 1]}`);
    }

    logColoredMessage(processedArgsArray.join(', '), 'green');
};

parseArgs();