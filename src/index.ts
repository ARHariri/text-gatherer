import { parser } from './parser/parser';
import { GatheringConfig, OutputtingConfig, Result } from './types';

type GatherFn = (
  gatheringConfig: GatheringConfig,
  outputtingConfig?: OutputtingConfig,
) => Promise<Result[]>;

export const gather: GatherFn = async (gatheringConfig, outputtingConfig) => {
  const results = await parser(gatheringConfig);

  return results;
};
