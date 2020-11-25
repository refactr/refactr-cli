import {strict as assert} from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import yargs from 'yargs';

import * as refactr from '../../../vendor/api-client/src';

// export const command = ['log-in', 'login'];
export const command = 'log-in';
export const aliases = 'login';
export const describe = 'Authenticate to Refactr’s API, storing fresh token on local machine';
const _builder1 = {
    // TODO: more detail
    username: {demandOption: true},
    password: {demandOption: 'provisional password desc'}
};
function _builder2(yargsInstance: yargs.BuilderCallback<any, any>) {
    yargsInstance.option('token-name');
}
// export const builder = _builder1;
export { _builder1 as builder };

export async function handler(parsedArgv: yargs.Arguments): void {
    const { username, password } = parsedArgv;
    const tokensApiClient = new refactr.TokensApi(
        new refactr.Configuration({
            // TODO: comment why these are necessory
            baseOptions: {
                auth: { username, password }
            }
        })
    );
    const _now = new Date().toISOString();
    const result = await tokensApiClient.createToken({
        name: 'CLI',
        expire: 2,
        expire_unit: refactr.InlineObjectExpireUnitEnum.Hours
        // expire_unit: 'hours' as refactr.InlineObjectExpireUnitEnum
    });
    assert.equal(result.status, 201);
    assert.equal(result.statusText, 'Created');
    assert.ok(result.data.token);
    const { token } = result.data;
    const stateStorePath = process.env.XDG_STATE_HOME ?? path.join(process.env.HOME!, '.local', 'store');
    const credentialsPath = path.join(stateStorePath, 'Refactr', 'token');
    fs.writeFileSync(credentialsPath, token);
    console.log({credentialsPath: token});
}

//function createToken()

//function acquireNewToken(configuredClient, tokenName, expiryQuantity, expiryUnits) {}
