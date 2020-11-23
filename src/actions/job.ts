import { printTable } from 'console-table-printer';

import { JobsApi, RunsApi } from '../../vendor/api-client/src';

import { error, log } from '../utilities';
import { getConfig } from '../getConfig';
import { retry } from '../utils/retry';

const FINISH_STATUSES = ['Succeeded', 'Failed'];

async function run(
    projectId: string,
    jobId: string,
    accessToken: string,
    basePath: string,
    {
        variables = {},
        waitUntilFinished = false,
        suppressOutputs = false,
        suppressEvents = false,
        suppressVariables = false
    }
) {
    const config = getConfig(basePath, accessToken);
    const jobClient = new JobsApi(config);
    const { data: { _id: runId } = {} } = await jobClient.runJob(
        projectId,
        jobId,
        {
            variables,
            suppress_outputs: suppressOutputs,
            suppress_events: suppressEvents,
            suppress_vars: suppressVariables
        }
    );

    if (!runId) {
        error('Unable to schedule a job!');
        return;
    } else {
        log(runId);
    }

    if (waitUntilFinished) {
        const runClient = new RunsApi(config);
        let eventsOffset = 0;

        await (async function pull(): Promise<
            { finish: boolean; run: any } | undefined
        > {
            let result;
            try {
                result = await retry(async () => {
                    const { data: run = {} } = await runClient.getRun(
                        projectId,
                        runId
                    );

                    if (typeof run === 'undefined') {
                        throw new Error('Unable to retrieve run!');
                    }

                    if (FINISH_STATUSES.includes(run.status)) {
                        return {
                            finished: true,
                            run
                        };
                    }

                    return {
                        finished: false,
                        run
                    };
                }, 3);
            } catch (err) {
                error(err.message);
                return;
            }

            const events = result?.run?.events ?? [];
            const totalEvents = events?.length ?? 0;

            for (let i = eventsOffset; i < totalEvents; i++) {
                if (typeof events[i] !== 'undefined') {
                    const event = events[i];

                    log(
                        `[${event.level}] ${event.occurred} - ${event.message}`
                    );
                    if (event.details) {
                        log(event.details);
                    }
                }
            }

            eventsOffset = totalEvents;

            if (result.finished) {
                const outputs = result?.run?.outputs;

                if (outputs) {
                    log('\n');
                    log('outputs');
                    printTable(
                        Object.keys(outputs).map((key) => ({
                            name: key,
                            value: outputs[key]
                        }))
                    );
                }

                return;
            }

            return await pull();
        })();
    }
}

async function list(projectId: string, accessToken: string, basePath: string) {
    const config = getConfig(basePath, accessToken);
    const client = new JobsApi(config);
    const { data: { jobs } = {} } = await client.listJobs(projectId);
    if (!jobs) {
        return;
    }

    printTable(
        jobs.map(({ _id, name }) => ({
            id: _id,
            name
        }))
    );
}

export { list, run };
