#!/usr/bin/env node
import { Command } from 'commander';

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

  console.log(`url: ${url}, iteration: ${options.iteration}`);
}

run();
