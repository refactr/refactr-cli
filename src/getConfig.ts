import { Configuration } from '../vendor/api-client/src';

function getConfig(basePath: string, accessToken: string) {
    return new Configuration({
        basePath,
        accessToken
    });
}

export { getConfig };
