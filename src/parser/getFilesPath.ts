import glob from 'glob';
import { flatten } from 'lodash';

export const getFilesPath = async (filePatterns: string[]): Promise<string[]> => {
  const findingFilesPromises = filePatterns.map((pattern) => getMatchFiles(pattern));

  return Promise.all(findingFilesPromises).then((filesList) => flatten(filesList));
};

const getMatchFiles = async (pattern: string): Promise<string[]> =>
  new Promise((resolve, reject) => {
    glob(pattern, (er, files) => {
      if (er) {
        reject(er);
        return;
      }
      resolve(files);
    });
  });
