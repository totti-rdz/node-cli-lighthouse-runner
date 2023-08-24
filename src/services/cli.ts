import { Command } from 'commander';
import { format } from '../utils/format.js';

export const cli = () => {
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

  return { url, options };
};
