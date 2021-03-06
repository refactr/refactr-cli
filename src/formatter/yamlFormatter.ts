import { safeDump } from 'js-yaml';

import { Formatter } from './formatter';

const yamlFormatter: Formatter = (input: unknown): string => {
  return safeDump(input, {
    indent: 4
  });
};

export default yamlFormatter;
