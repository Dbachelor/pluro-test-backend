const cheerio = require('cheerio');
const { suggestions } = require('../utils');
const path = require('path')


class HTMLAnalyzerService {

    //checks if file is a valid HTML document
    isFileHTML = (fileName) => {
        if (!['.html', '.htm'].includes(path.extname(fileName))){
            return false;
        }
        return true;
    }

    //Detects the line of error
    lineDetectorTextService = (lines, element) => {
        let lineNumber = (lines.findIndex((line) => line.includes(element)))
          if (lineNumber >= 0) {
            lineNumber = `on line ${(lineNumber + 1)}`
          }else{
            lineNumber = ''
          }
          return lineNumber
    }

    //Analyzes the file against the rules in place
    analyzeAccessibility(htmlContent) {
        const $ = cheerio.load(htmlContent);
        const lines = htmlContent.split('\n');
        const issues = [];
        let complianceScore = 100;
       
        // Check for missing alt attributes on images
        $('img').each((_, img) => {
         let imgTag = $.html(img); 
          if (!$(img).attr('alt') || $(img).attr('alt') == '') {
            issues.push({ type: `Missing alt attribute on line ${this.lineDetectorTextService(lines, imgTag)}`, element: $(img).toString(), suggestion: suggestions.img });
            complianceScore -= 5;
          }
        });
       
        if (!$("title") || $("title")?.text() == ''){
         const title = $.html($("title")); 
         issues.push({ type: `Missing title tag or title tag value ${this.lineDetectorTextService(lines, $("title"))}`, element: $("title")?.toString() || '<title><title>', suggestion: suggestions.title });
           complianceScore -= 10
        }
       
       
        // Check for skipped heading levels
        const headings = $('h1, h2, h3, h4, h5, h6')
          .map((_, el) => parseInt(el.tagName[1]))
          .get();
       
          
       
        for (let i = 0; i <= headings.length; i++) {
          if (headings[i + 1] > headings[i] + 1) {
            issues.push({ type: 'Skipped heading level in document', element: `Cannot move from <h${headings[i]}> to <h${headings[i + 1]}> `, suggestion: suggestions.heading });
            complianceScore -= 5;
          }
        }
       
         // Check for inline styles
         $('[style]').each((_, element) => {
           let _style = $.html(element);
           issues.push({ type: `Inline style detected ${this.lineDetectorTextService(lines, _style)}`, element: $(element).toString(), suggestion: suggestions.inlineStyle });
           complianceScore -= 3;
         });
       
         // Checking for duplicate IDs
         const ids = {};
         $('[id]').each((_, element) => {
           const id = $(element).attr('id');
           if (ids[id]) {
             let _ids = $.html(element);
             issues.push({ type: `Duplicate ID detected ${this.lineDetectorTextService(lines, _ids)}`, element: $(element).toString(), suggestion: suggestions.duplicateID });
             complianceScore -= 8;
           } else {
             ids[id] = true;
           }
         });
       
       
         // Check for missing labels for form inputs, labels are essential tools for screen readers to identify fields
         $('input').each((_, input) => {
           const id = $(input).attr('id');
           const hasLabel = $(`label[for="${id}"]`).length > 0;
           if (!hasLabel) {
             let _labels = $.html(input);
             issues.push({ type: `Missing label for input ${this.lineDetectorTextService(lines, _labels)}`, element: $(input).toString(), suggestion: suggestions.missingLabels });
             complianceScore -= 3;
           }
         });
       
       
       
         // Check for non-semantic tags used for content
         $('div').each((_, div) => {
           const content = $(div)?.text().trim();
           if (content && /Navigation|Section/.test(content)) {
             let _semantic = $.html(div);
             
             issues.push({ type: `Non-semantic tag used ${this.lineDetectorTextService(lines, _semantic)}`, element: $(div).toString(), suggestion: suggestions.nonSemanticTag });
             complianceScore -= 2;
           }
         });
       
       
        return {
          complianceScore: Math.max(complianceScore, 0),
          issues,
        };
    }
}

module.exports = { HTMLAnalyzerService };