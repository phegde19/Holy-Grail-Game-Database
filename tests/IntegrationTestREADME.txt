# How to Run Integration Tests

1. Ensure Firebase configuration is in src/firebaseConfig.js
2. Make sure Firestore rules allow reads/writes for test users.
3. From the project root directory, install dependencies if you have not already from UserTestREADME.txt:
   npm install
   npm install --save-dev jest-environment-jsdom
   npm install --save-dev @babel/preset-env @babel/core
4. Run the following command:
   
   npm test

> Integration test file: tests/saveAndRetrieveList.test.js
