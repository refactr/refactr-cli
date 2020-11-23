import { ProjectsApi } from '../../vendor/api-client/src';

import { getConfig } from '../getConfig';
import { error, handleAPIError } from '../utilities';
import { printTable } from 'console-table-printer';

async function list(
    accessToken: string,
    basePath: string,
    { organizationId }: { organizationId?: string } = {}
) {
    const client = new ProjectsApi(getConfig(basePath, accessToken));

    let projects;
    try {
        if (organizationId) {
            const { data } = await client.listOrganizationProjects(
                organizationId
            );
            projects = data.projects;
        } else {
            const { data } = await client.listProjects();
            projects = data.projects;
        }
    } catch (err) {
        handleAPIError(err);
        return;
    }

    if (!projects) {
        error('No projects were found!');
        return;
    }

    printTable(
        projects.map(({ _id, name, organization_id }) => ({
            id: _id,
            name,
            organization_id
        }))
    );
}

export { list };
