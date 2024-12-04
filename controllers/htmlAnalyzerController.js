const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const { analyzeAccessibility } = require('../services/htmlAnalyzer');
const { isFileHTML } = require('../services/fileValidationService');


const app = express();
const uploads = multer({ dest: 'uploads/' });


app.use(express.json());

exports.analyzeFile = async (req, res) => {
    try {
        const filePath = req.file?.path;
        const htmlContent = await fs.readFile(filePath, 'utf-8');
     
        //check if the file is a valid html file
        if (!isFileHTML(req.file?.originalname)) res.json({success:false, message: `File ${req.file.originalname} is not a valid HTML file`});
        //if file is a valid HTML file, analyze it
        const data = analyzeAccessibility(htmlContent);
     
     
        //remove the file afterwards
        await fs.unlink(filePath);
     
        res.json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to parse file' + error });
      }
}