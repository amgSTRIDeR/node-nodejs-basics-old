const parseArgs = () => {
    const argvArr = process.argv.slice(2);
    const preparedArr = argvArr.reduce((acc, curr, index) => {
        if (curr.startsWith('--')) {
            acc.push(`${curr.slice(2)} is ${argvArr[index + 1]}`);
        }
        return acc;
    }, []);

    console.log(preparedArr.join('; '));
};

parseArgs();