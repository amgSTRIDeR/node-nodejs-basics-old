import logColoredMessage from "../common/colors.js";

const parseEnv = () => {
    const rssArgs = [];
    const envArgs = process.env;
    for (const key in envArgs) {
        if (key.startsWith('RSS_')) {
            rssArgs.push(`${key}:${envArgs[key]}`);
        }
    }

    const finalString = rssArgs.join('; ');
    logColoredMessage(finalString, 'green');
};

parseEnv();