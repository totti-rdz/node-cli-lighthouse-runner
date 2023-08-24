import os from 'os';
import chalk from 'chalk';

export const styleError = (message: string) =>
  chalk.bold.redBright(message + os.EOL);
