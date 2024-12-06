# App Setup
    - clone repo from (https://github.com/Dbachelor/pluro-test-backend.git)
    - cd into the root folder and run npm install or sudo npm install depending on the system user level
    - run nodemon app.js in the terminal to start the backend server
    - minimum of node v18 is required to run successfully
    - npm run test to execute test cases

# Project architecture & scoring mechanism
- The project uses cheerio library to analyze html files and then generates a compliance score based on the clauses it checks against.

- Kindly see the scoring mechanism currently in place.

- The program would deduct 5% from the compliance Score for every missing alt attribute in an image tag
- The program would deduct 10% from the compliance Score if the document does not contain a title tag or if the title tag is empty.
- The program would deduct 5% from the compliance Score for every skipped heading tag. see examples of a skipped heading below

       
        <h1> hello world </h1>
        <h3> hello world 3 </h3> 
        <h5> hello world 5</h5> 
    
    This is a skipped heading because the sequence went from h1 to h3 then to h5,  a none skipped heading would follow the sequence below <br />
    
        <h1> hello world </h1> 
        <h2> hello world 2</h2> 
        <h3> hello world 3</h3> 
    
- The program would deduct 3% each time it detects an inline style.
- The program would deduct 8% whenever it detects a duplicated Id attribute.
- The program would deduct 3% if an input field does not contain a label.
- In certain cases where semantic tags would have been preferred, if not used, the program would deduct 2%
- The program will return an object containing the compliance Score and issues detected as well as the suggestions.
- Incase of a negative compliance Score, the program will return 0;

- 
    - you can also find sample html files in the  ./uploads folder to test with.

-  - Author: Joachim Ojiodu
