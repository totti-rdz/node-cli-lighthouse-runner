import { format } from './format.js';

export const handleError = (message: string) => {
  console.error(format.error(message));
  process.exit(1);
};
