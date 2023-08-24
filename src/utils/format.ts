import os from 'os';
import chalk from 'chalk';
import { handleError } from './handleError.js';

class Format {
  public error(message: string) {
    return chalk.bold.redBright(message + os.EOL);
  }

  public score(score: number, value: number) {
    /**
     * Coloring display value based on Lighthouse score.
     *
     * - 0 to 0.49 (red): Poor
     * - 0.5 to 0.89 (orange): Needs Improvement
     * - 0.9 to 1 (green): Good
     */
    if (score < 0 || score > 1) {
      handleError('Score out of bound');
    }

    if (score >= 0.9 && score <= 1) {
      return chalk.green(`${value} (Good)`);
    }

    if (score >= 0.5 && score < 0.9) {
      return chalk.yellow(`${value} (Needs Improvement)`);
    }

    return chalk.red(`${value} (Poor)`);
  }
}

export const format = new Format();
