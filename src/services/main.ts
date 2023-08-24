import { cli } from './cli.js';
import { runLightHouse } from './runLighthouse.js';
import { resultHandler } from './resultHandler.js';

export async function main() {
  const { url, options } = cli();

  const results = runLightHouse(url, options);

  resultHandler.process(results);
}
