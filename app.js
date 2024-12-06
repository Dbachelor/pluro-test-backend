const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { FileAnalyzer } = require('./controllers/htmlAnalyzerController');
let fileAnalyzerController = new FileAnalyzer();



const app = express();
const uploads = multer({ dest: 'uploads/' });

let corsOptions = {
    origin: [ 'http://localhost:3001', 'http://localhost:3000', 'http://localhost:3002', 'https://pluro-test-frontend.vercel.app' ]
};
app.use(express.json());


app.post('/upload', cors(corsOptions), uploads.single('htmlFile'), fileAnalyzerController.analyzeFile);


app.listen(5000, () => console.log('running...'));
