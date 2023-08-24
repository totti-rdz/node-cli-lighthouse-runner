import { styleError } from './styleError.js';

export const handleError = (message: string) => {
  console.error(styleError(message));
  process.exit(1);
};
