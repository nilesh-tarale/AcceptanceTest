

Prerequisite

NodeJs - v14.15.1
TestCafe - 1.9.4
Browser: Chrome 86.0.4240.198 / Windows 10


How to install TestCafe
1. Install node js first
         Download the Windows installer from https://nodejs.org/en/download/ 
         Run the installer (the . msi file you downloaded in the previous step.)
         Follow the prompts in the installer (Accept the license agreement, click the NEXT button a bunch of times and accept the default installation settings).
         Restart your computer
2. Install TestCafe
         Enter below CLI command on terminal 
                 npm install -g testcafe

How to run the test
1. Open the command prompt from the folder where scripts are located
2. Enter below command to run the tests
          testcafe chrome .\AcceptanceTest.js
3. The console will display the test results once after the test execution.
