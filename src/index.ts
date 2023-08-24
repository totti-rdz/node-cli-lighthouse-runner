#!/usr/bin/env node
import { Command } from 'commander';
import { computeMedianRun } from 'lighthouse/core/lib/median-run.js';
import chalk from 'chalk';
import { format } from './utils/format.js';
import { handleError } from './utils/handleError.js';
import { runLightHouse } from './services/runLighthouse.js';

async function run() {
  const program = new Command();

  program
    .argument('<url>', 'Lighthouse will run the analysis on the URL.')
    .option(
      '-i, --iteration <type>',
      'How many times Lighthouse should run the analysis per URL',
      '5'
    )
    .configureOutput({
      outputError: (str, write) => write(format.error(str)),
    })
    .parse();

  const [url] = program.args;
  const options = program.opts();

  if (!(url.startsWith('http://') || url.startsWith('https://'))) {
    handleError('Url must start with "http://" or "https://"');
  }

  const results = runLightHouse(url, options);

  if (!results || results.length < 1) {
    handleError('Running lighthouse yielded no results');
    return;
  }

  const median = computeMedianRun(results);

  console.info(`\n${chalk.green('✔')} Report is ready for ${median.finalUrl}`);
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
    console.info(`🗼 Median ${title}: ${format.score(score, displayValue)}`);
  });
}

console.clear();
run();
