const parseEnv = () => {
    const envArray = [];
    for(let key in process.env) {
        if (key.startsWith('RSS_')) {
            envArray.push(`${key}=${process.env[key]}`);
        }
    }

    console.log(envArray.join('; '));
};

parseEnv();