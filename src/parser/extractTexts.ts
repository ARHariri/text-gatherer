import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { flatten } from 'lodash';
import { Result } from '../types';

export const extractTexts = async (
  filePaths: string[],
  textPatterns: RegExp[],
): Promise<Result[]> => {
  const individualFileResultPromises = filePaths.map((filePath) =>
    extractTextFromFile(filePath, textPatterns).then((res) => {
      console.log(` *** file ${filePaths} processing done *** `);
      return res;
    }),
  );

  return Promise.all(individualFileResultPromises).then((resultList) =>
    flatten(resultList),
  );
};

const extractTextFromFile = async (
  filePath: string,
  textPatterns: RegExp[],
): Promise<Result[]> => {
  return new Promise((resolve, reject) => {
    const extractedTexts: Result[] = [];

    const fileReadStream = createReadStream(filePath);

    const lineReader = createInterface({
      input: fileReadStream,
      crlfDelay: Infinity,
    });

    let lineCounter = 0;

    lineReader.on('line', (line) => {
      lineCounter++;

      for (const regexp of textPatterns) {
        const matchedValues = line.match(regexp);

        if (matchedValues) {
          const partialResult = matchedValues.map((mv) => ({
            text: mv,
            line: lineCounter,
            pattern: regexp,
            filePath,
          }));

          extractedTexts.push(...partialResult);
        }
      }
    });

    lineReader.on('close', () => resolve(extractedTexts));
    lineReader.on('SIGTSTP', () => reject('An error occurred'));
  });
};
