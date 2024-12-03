const express = require('express');
const multer = require('multer');
const cors = require('cors');
// const fs = require('fs').promises;
// const path = require('path');
// const { analyzeAccessibility } = require('./services/htmlAnalyzer');
const { analyzeFile } = require('./controllers/htmlAnalyzerController');



const app = express();
const uploads = multer({ dest: 'uploads/' });

let corsOptions = {
    origin: [ 'http://localhost:3001', 'http://localhost:3000' ]
};
app.use(express.json());


app.post('/upload', cors(corsOptions), uploads.single('htmlFile'), analyzeFile);


app.listen(5000, () => console.log('running'));
