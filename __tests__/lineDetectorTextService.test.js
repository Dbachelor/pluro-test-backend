const cheerio = require('cheerio');
const fs = require('fs');
const { lineDetectorTextService } = require("../services/lineDetectorTextService");



// const htmlContent = read
const htmlContent = fs.readFileSync(`${__dirname}/test.html`,
    { encoding: 'utf8', flag: 'r' });
describe("HTML Analyzer", () => {
    
    const $ = cheerio.load(htmlContent);
    const lines = htmlContent.split('\n');
    let complianceScore = 100
    let lineNumber = 0
    $('img').each((_, img) => {
        let imgTag = $.html(img); 
        if (!$(img).attr('alt') || $(img).attr('alt') == '') {
            lineNumber += lineDetectorTextService(lines,  imgTag).length;
            complianceScore -= 5;
        }
    
    });

    it("checks if error line is detected",  () => {
        console.log(lineNumber)
        expect(lineNumber > 0).toBe(true)
        
        
    });

    it("checks that the code deducts from the compliance score on error", () => {
        expect(complianceScore == 100).toBe(false)
    })
})

