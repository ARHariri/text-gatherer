export interface GatheringConfig {
  filesPattern: string[];
  patterns: RegExp[];
}

export interface OutputtingConfig {
  pattern: boolean;
  filePath: boolean;
  line: boolean;
}

export interface Result {
  text: string;
  pattern?: RegExp;
  filePath?: string;
  line?: number;
}
