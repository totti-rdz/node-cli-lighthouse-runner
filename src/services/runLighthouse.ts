import { createRequire } from 'node:module';
import { OptionValues } from 'commander';
import spawn from 'cross-spawn';

const require = createRequire(import.meta.url);

const lighthouse = require.resolve('lighthouse/cli');

export const runLightHouse = (url: string, options: OptionValues) => {
  console.info(
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
  return results;
};
