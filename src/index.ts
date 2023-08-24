#!/usr/bin/env node
import { Command } from 'commander';
import { format } from './utils/format.js';
import { handleError } from './utils/handleError.js';
import { runLightHouse } from './services/runLighthouse.js';
import { resultHandler } from './services/resultHandler.js';

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

  resultHandler.process(results);
}

console.clear();
run();
