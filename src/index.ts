#!/usr/bin/env node
import { cli } from './services/cli.js';
import { runLightHouse } from './services/runLighthouse.js';
import { resultHandler } from './services/resultHandler.js';

async function run() {
  const { url, options } = cli();

  const results = runLightHouse(url, options);

  resultHandler.process(results);
}

console.clear();
run();
