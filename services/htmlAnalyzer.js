const cheerio = require('cheerio');
const { suggestions } = require('../utils');


function analyzeAccessibility(htmlContent) {
 const $ = cheerio.load(htmlContent);
 const issues = [];
 let complianceScore = 100;


//  {
//   "compliance_score": 85,
//   "issues": [
//     {
//       "type": "Missing alt attribute",
//       "element": "<img src='example.jpg'>",
//       "suggestion": "Add a descriptive alt attribute."
//     },
//     {
//       "type": "Skipped heading levels",
//       "element": "<h3>Subsection</h3>",
//       "suggestion": "Ensure proper sequence of heading levels."
//     }
//   ]
// }

 // Check for missing alt attributes on images
 $('img').each((_, img) => {
   if (!$(img).attr('alt')) {
     issues.push({ type: 'Missing alt attribute', element: $(img).toString(), suggestion: suggestions.img });
     complianceScore -= 5;
   }
 });


 // Check for skipped heading levels
 const headings = $('h1, h2, h3, h4, h5, h6')
   .map((_, el) => parseInt(el.tagName[1]))
   .get();

   

 for (let i = 0; i <= headings.length; i++) {
   if (headings[i + 1] > headings[i] + 1) {
     issues.push({ type: 'Skipped heading level', element: `Cannot move from <h${headings[i]}> to <h${headings[i + 1]}> try `, suggestion: suggestions.heading });
     complianceScore -= 10;
   }
 }


 return {
   complianceScore: Math.max(complianceScore, 0),
   issues,
 };
}


module.exports = { analyzeAccessibility };



