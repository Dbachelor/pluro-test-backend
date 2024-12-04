# App Setup
    - clone repo from (https://github.com/Dbachelor/pluro-test-backend.git)
    - cd into the root folder and run npm install or sudo npm install depending on the system user level
    - run nodemon app.js in the terminal to start the backend server
    - minimum of node v18 is required to run successfully

# Project architecture & scoring mechanism
- The project uses cheerio library to analyze html files and then generates a compliance score based on the clauses it checks against.

- Kindly see the scoring mechanism currently in place.

- The program would deduct 5% from the compliance Score for every missing alt attribute in an image tag
- The program would deduct 10% from the compliance Score if the document does not contain a title tag or if the title tag is empty.
- The program would deduct 5% from the compliance Score for every skipped heading tag e.g (<H1> to <h4>).
- The program would deduct 3% each time it detects an inline style.
- The program would deduct 8% whenever it detects a duplicated Id attribute.
- The program would deduct 3% if an input field does not contain a label.
- In certain cases where semantic tags would have been preferred, if not used, the program would deduct 2%
- The program will return an object containing the compliance Score and issues detected as well as the suggestions.
- Incase of a negative compliance Score, the program will return 0;

- 
    - you can find sample html files in the  ./uploads folder to test with.

- Author: Joachim Ojiodu
