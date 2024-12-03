const express = require('express');
const multer = require('multer');
// const fs = require('fs').promises;
// const path = require('path');
// const { analyzeAccessibility } = require('./services/htmlAnalyzer');
const { analyzeFile } = require('./controllers/htmlAnalyzerController');


const app = express();
const uploads = multer({ dest: 'uploads/' });


app.use(express.json());


app.post('/upload', uploads.single('htmlFile'), analyzeFile);


app.listen(5000, () => console.log('running'));
