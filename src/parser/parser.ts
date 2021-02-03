import { getFilesPath } from './getFilesPath';
import { extractTexts } from './extractTexts';
import { GatheringConfig, Result } from '../types';

export const parser = async (config: GatheringConfig): Promise<Result[]> => {
  const filePaths = await getFilesPath(config.filesPattern);
  const extractedTexts = await extractTexts(filePaths, config.patterns);

  return extractedTexts;
};
