import { computeMedianRun } from 'lighthouse/core/lib/median-run.js';
import * as LH from 'lighthouse/types/lh.js';
import { format } from '../utils/format.js';
import chalk from 'chalk';
import { handleError } from '../utils/handleError.js';

class ResultHandler {
  public compute(results: LH.Result[]) {
    return computeMedianRun(results);
  }

  public display(median: LH.Result) {
    console.info(
      `\n${chalk.green('✔')} Report is ready for ${median.finalUrl}`
    );

    if (median.categories.performance.score === null) {
      handleError('Median result is null');
      return; // to ensure type narrowing in typescript
    }

    console.info(
      `🗼 Median performance score: ${format.score(
        median.categories.performance.score,
        median.categories.performance.score * 100
      )}`
    );

    const primaryMatrices = [
      'first-contentful-paint',
      'interactive',
      'speed-index',
      'total-blocking-time',
      'largest-contentful-paint',
      'cumulative-layout-shift',
    ];

    primaryMatrices.map((matrix) => {
      const { title, displayValue, score } = median.audits[matrix];
      if (displayValue == undefined || score === null) {
        handleError(`No information available for ${title}`);
        return; // to ensure type narrowing in typescript
      }
      console.info(`🗼 Median ${title}: ${format.score(score, displayValue)}`);
    });
  }

  public process(results: LH.Result[]) {
    if (!results || results.length < 1) {
      handleError('Running lighthouse yielded no results');
    }
    const median = this.compute(results);
    this.display(median);
  }
}

export const resultHandler = new ResultHandler();
