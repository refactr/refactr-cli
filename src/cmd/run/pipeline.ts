import { createCommandResult, handler } from '../handler';
import { createStream } from '../run-event-stream';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  pipelineId: string;
  revisionId: string;

  wait?: boolean;
  suppressEvents?: boolean;
  suppressOutputs?: boolean;
  suppressVariables?: boolean;
  var?: { [key: string]: string };
};

export default handler<Arguments, any>(
  async (
    apiClient,
    {
      projectId,
      pipelineId,
      revisionId,
      suppressEvents = false,
      suppressOutputs = false,
      suppressVariables = false,
      var: variables,
      wait = false
    }
  ) => {
    const { data: run } = await apiClient.pipelines.runPipeline(
      projectId,
      pipelineId,
      revisionId,
      {
        suppress_events: suppressEvents,
        suppress_outputs: suppressOutputs,
        suppress_vars: suppressVariables,
        variables
      }
    );

    if (wait) {
      const stream = createStream(apiClient, projectId, run._id!);
      return createCommandResult('streaming', stream, fields.runEvent);
    }

    return createCommandResult('view', run, fields.run);
  }
);
