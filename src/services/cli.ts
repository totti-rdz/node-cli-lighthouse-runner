import { Command } from 'commander';
import { format } from '../utils/format.js';
import { handleError } from '../utils/handleError.js';

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

  if (!(url.startsWith('http://') || url.startsWith('https://'))) {
    handleError('Url must start with "http://" or "https://"');
  }

  return { url, options };
};
