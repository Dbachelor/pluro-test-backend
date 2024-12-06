exports.lineDetectorTextService = (lines, element) => {
    let lineNumber = (lines.findIndex((line) => line.includes(element)))
      if (lineNumber >= 0) {
        lineNumber = `on line ${(lineNumber + 1)}`
      }else{
        lineNumber = ''
      }
      return lineNumber
}