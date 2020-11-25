import yargs from 'yargs';
import * as winston from 'winston';
// import { AxiosError } from 'axios';
// import * as axiosBuilt from '../vendor/axios/dist/axios'
// import * as axiosEverything from '../vendor/axios';
import {default as axiosDefault, AxiosError} from '../vendor/axios';

import * as refactrApiClientLib from '../vendor/api-client/src';
const { TokensApi } = refactrApiClientLib;

// const loggerDefaults = winston.createLogger({
//     level: 'debug',
//     format: winston.format.combine(
//         winston.format.timestamp({
//             format: 'YYYY-MM-DD HH:mm:ss'
//         }),
//         winston.format.errors({ stack: true }),
//         winston.format.splat(),
//         winston.format.json()
//     ),
//     defaultMeta: { service: 'your-service-name' },
// });

// const consoleTransport = new winston.transports.Console({
//     format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.simple()
//     )
// });

// TODO: figure out how to only write to stderr, leaving stdout for actual value
const logger = winston.createLogger({
    // ...winston.config.cli,
    levels: winston.config.cli.levels,
    level: 'verbose',
    transports: [new winston.transports.Console({
        // TODO: look up how `combine` works
        format: winston.format.combine(
            // TODO: do these functions commute?
            winston.format.colorize(
                // { colors: winston.config.cli.colors}
            ),
            winston.format.simple()
        )
    })]
    // transports: [consoleTransport]
});

// //
// // If we're not in production then **ALSO** log to the `console`
// // with the colorized simple format.
// //
// if (process.env.NODE_ENV !== 'production') {
//     loggerDefaults.add(new winston.transports.Console({
//         format: winston.format.combine(
//             winston.format.colorize(),
//             winston.format.simple()
//         )
//     }));
// }

// Apparently `yargs(argv).parse()` = `yargs().parse(argv)`?

// const yargsInstance = yargs.command(['log-in', 'login'], 'Authenticate the local machine to Refactr’s API, creating & using a fresh token'/*, {
//     // <https://github.com/yargs/yargs/blob/e2d9e9364099fe1f1992d4beaff1cbd56ad3df28/lib/typings/yargs-parser-types.ts#L90>
//     username: {
//         // alias: 'u',
//         // describe:
//     },
//     passphrase: {
//         describe: 'example description'
//     }
// }*/, (_yargs) => {
//     logger.debug('inside builder 1');
//     console.log(_yargs);
// }, (_argv) => {
//     logger.debug('inside handler 1');
//     console.log(_argv);
// }).demandCommand(
//
// ).command('list', '(provisional list desc)', innerYargs => {
//     logger.debug('inside builder 2');
//     return innerYargs.command(['organizations', 'orgs', 'organization', 'org'], '(provisional org desc)', innerInnerYargs => {
//         logger.debug('inside builder 3');
//         console.log(innerInnerYargs);
//         return innerInnerYargs;
//     }, innerInnerArgv => {
//         logger.debug('inside handler 3');
//         console.log(innerInnerArgv);
//         return innerInnerArgv;
//     }).command(['projects', 'project'], '(provisional project desc)', innerInnerYargs2 => {
//         logger.debug('inside builder 4');
//         console.log(innerInnerYargs2);
//         return innerInnerYargs2;
//     }, innerInnerArgv2 => {
//         logger.debug('inside handler 4');
//         console.log(innerInnerArgv2);
//         return innerInnerArgv2;
//     });
// }, innerArgv => {
//     logger.debug('inside handler 2');
//     console.log(innerArgv);
//     return innerArgv;
// }).usage(
//     'Usage: $0 <verb> [target]'
// );

const yargsInstance = yargs.command(['log-in', 'login'], 'Authenticate the local machine to Refactr’s API, creating & using a fresh token', {
    //username4: {demandOption: true},
    //username5: {demandOption: 'provisional username5 desc'}
}, innerArgv => {
    logger.debug('inside login handler');
    console.warn(innerArgv);
    const {username, passphrase} = innerArgv;
    console.warn({username, passphrase});
    return innerArgv;
}).
demandOption('username1').
demandOption(['username2', 'username3']);



const res = yargsInstance.parse(process.argv.slice(2));

// const tokensClient = new TokensApi({
//     username: 'josh@refactr.it',
//     password:
// });

// const tokensClient = new TokensApi(new refactrApiClientLib.Configuration({
//     username: 'josh@refactr.it',
//     password: ''
// }));

const tokensClient1 = new TokensApi(new refactrApiClientLib.Configuration({
    baseOptions: {
        auth: {
            username: 'josh@refactr.it',
            password: ''
        }
    }
}));

function handleErrors(e: AxiosError) {
    // console.debug(e);
    const errors = e?.response?.data?.errors;
    console.error(errors);
}

process.on('unhandledRejection', handleErrors);
process.on('uncaughtException', handleErrors);

async function getToken(n: number = 3) {
    let tokenCreationResult;
    try {
        tokenCreationResult = await tokensClient1.createToken({
            name: `scratch at CLI ${n}`,
            expire: 2,
            expire_unit: refactrApiClientLib.InlineObjectExpireUnitEnum.Hours
            // expire_unit: 'hours' as refactrApiClientLib.InlineObjectExpireUnitEnum
        });
        console.log(tokenCreationResult);
    } catch (e) {
        console.error(e);
    }
}

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWZhMzI5YTE4Y2M4ZjAzOGZhMmMwNTZjIiwia2lkIjoicjFidE93R2x2cEpuUXdVSVJYTmVkIiwibmFtZSI6InNjcmF0Y2ggYXQgQ0xJIDMiLCJpYXQiOjE2MDYyODc1MzcsImV4cCI6MTYwNjI5NDczNywiYXVkIjoiYXBpLnJlZmFjdHIuaXQiLCJpc3MiOiJhcGkucmVmYWN0ci5pdCIsInN1YiI6IjVmYTMyOWExOGNjOGYwMzhmYTJjMDU2YyJ9.jd-sz2n9YJ5Zvdfjt9OXIx5woBrQIxNZiya46sQCNlMok4BwC3lrc0_ldVrzovn7TinDGrzlNxzFXcJ8k__WuA';

const _tokensClientWithKey = new TokensApi(
    new refactrApiClientLib.Configuration({
        apiKey: token
    })
);

const tokensApiClient = new TokensApi(
    new refactrApiClientLib.Configuration({
        accessToken: token
    })
);

async function listTokens() {
    try {
        const resp = await tokensApiClient.listTokens();
        logger.silly(resp);
        console.warn(resp.data);
    } catch (e: unknown) {
        console.warn(e);
        //logger.debug(e);
        //logger.debug('Exception', e);
        if (axiosDefault.isAxiosError(e)) {
            const errors = e.response?.data?.errors;
            if (errors && errors.length > 0) {
                console.error(errors);
            }
        }
    }
}

async function main() {
    const importResult1 = import('./commands/verbs/log-in');
    const importResult2 = await importResult1;
    const yargsInstance2 = yargs.command(await import('commands/verbs/log-in'))
}
