const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');

const { HTMLAnalyzerService } = require('../services/htmlAnalyzerService');


const app = express();
const uploads = multer({ dest: 'uploads/' });

app.use(express.json());


class FileAnalyzer {

  constructor() {
    this.service = new HTMLAnalyzerService();
  }

  async analyzeFile(req, res){
    let service = new HTMLAnalyzerService();
      try {
          const filePath = req.file?.path;
          const htmlContent = await fs.readFile(filePath, 'utf-8');
       
          //check if the file is a valid html file
          if (!service.isFileHTML(req.file?.originalname)) res.json({success:false, message: `File ${req.file.originalname} is not a valid HTML file`});
          //if file is a valid HTML file, analyze it
          const data = service.analyzeAccessibility(htmlContent);
       
          //remove the file afterwards
          await fs.unlink(filePath);
       
          res.json(data);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to parse file' + error });
        }
  }

}

module.exports = { FileAnalyzer }