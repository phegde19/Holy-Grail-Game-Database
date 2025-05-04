Unit Tests - Holy Grail Game Database

To run the unit tests:

1. Make sure you have Node.js and npm installed.
2. From the project root directory, install dependencies:
   npm install
   npm install --save-dev jest-environment-jsdom
   npm install --save-dev @babel/preset-env @babel/core

3. Run the tests:
   npm test

Note:
- The tests are written using Jest.
- The test files are located in the `tests/` folder.
- Each test covers functionality like list saving/loading and search filtering.
