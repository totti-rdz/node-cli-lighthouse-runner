#!/usr/bin/env node
import { handleError } from './utils/handleError.js';
import { runLightHouse } from './services/runLighthouse.js';
import { resultHandler } from './services/resultHandler.js';
import { cli } from './services/cli.js';

async function run() {
  const { url, options } = cli();

  if (!(url.startsWith('http://') || url.startsWith('https://'))) {
    handleError('Url must start with "http://" or "https://"');
  }

  const results = runLightHouse(url, options);

  resultHandler.process(results);
}

console.clear();
run();
