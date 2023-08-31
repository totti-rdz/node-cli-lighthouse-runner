# lighthouse-runner-cli

This is a Node.js command-line tool that runs muliple Google Lighthouse performance tests on a given URL, calculates the median from the results, and displays it on the command line.

I created this CLI as a learning project to delve into building command-line interfaces using Node.js.

## Usage

To run the project it has to be cloned as it is not published to npm.

1. Clone this repository:

   ```sh
   git clone https://github.com/totti-rdz/node-cli-lighthouse-runner.git
   ```
   
2. Install and build project:

   ```sh
   npm install && npm run build
   ```
   
3. Enable execution of the built output:

   ```sh
   npm run chmod
   ```

4. Run:

   ```sh
   ./bin/index.js https://www.google.de --iteration 5
   ```

   The --iteration flag is optional. If not specified, the lighthouse test will be run 5 times by default.

5. Or create symlink (optionally):

   To use this project from anywhere create a symlink

   ```sh
   npm link
   ```

   and run with

   ```sh
   lighthouse-runner https://www.google.de --iteration 5
   ```

   The --iteration flag is optional. If not specified, the lighthouse test will be run 5 times by default.

   To remove the symlink run

   ```sh
   npm unlink -g
   ```

   from the project root folder.

   Confirm removal by trying to run lighthouse-runner again. If not removed look for the installation path with the "which" command and remove it manually.

## Credits

This project was inspired by the tutorial [Writing Your Own TypeScript CLI](https://dawchihliou.github.io/articles/writing-your-own-typescript-cli#using-the-cli-in-github-actions) by [Daw-Chih Liou](https://dawchihliou.github.io/). I made certain adjustments to the code to structure the project and ensure it works correctly in my environment and with current package versions.

Feel free to use, modify, and expand upon this project as you like. Happy coding!
