#!/usr/bin/env node
import { Command } from 'commander';
import spawn from 'cross-spawn';
import { createRequire } from 'node:module';
import {computeMedianRun} from 'lighthouse/core/lib/median-run.js'
import chalk from 'chalk';
import { draw } from './utils/printScore.js';

const require = createRequire(import.meta.url);

const lighthouse = require.resolve('lighthouse/cli');

async function run() {
  const program = new Command();

  program
    .argument('<url>', 'Lighthouse will run the analysis on the URL.')
    .option(
      '-i, --iteration <type>',
      'How many times Lighthouse should run the analysis per URL',
      '5'
    )
    .parse();

  const [url] = program.args;
  const options = program.opts();

  console.log(
    `🗼 Running Lighthouse for ${url}. It will take a while, please wait...`
  );
  const results = [];

  for (let i = 0; i < options.iteration; i++) {
    const { status, stdout } = spawn.sync(process.execPath, [
      lighthouse,
      url,
      '--output=json',
      '--chromeFlags=--headless',
      '--only-categories=performance',
    ]);

    if (status !== 0) {
      continue;
    }

    results.push(JSON.parse(stdout.toString()));
  }

const median = computeMedianRun(results)

console.log(`\n${chalk.green('✔')} Report is ready for ${median.finalUrl}`)
console.log(
  `🗼 Median performance score: ${draw(
    median.categories.performance.score,
    median.categories.performance.score * 100
  )}`
)

const primaryMatrices = [
  'first-contentful-paint',
  'interactive',
  'speed-index',
  'total-blocking-time',
  'largest-contentful-paint',
  'cumulative-layout-shift',
]

primaryMatrices.map((matrix) => {
  const { title, displayValue, score } = median.audits[matrix]
  console.log(`🗼 Median ${title}: ${draw(score, displayValue)}`)
})
}

run();
