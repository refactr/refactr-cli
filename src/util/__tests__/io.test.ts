import { join } from 'path';

import { readPipelineFile, readStdin } from '../io';

describe('io', () => {
  describe('readFile', () => {
    let expected: object;
    beforeAll(() => {
      expected = require('./fixtures/readFile/extected.json');
    });

    test('read JSON file', () => {
      expect(
        readPipelineFile(join(__dirname, './fixtures/readFile/test.json'))
      ).toStrictEqual(expected);
    });

    test('read YAML file', () => {
      expect(
        readPipelineFile(join(__dirname, './fixtures/readFile/test.yaml'))
      ).toStrictEqual(expected);
    });
  });
});
