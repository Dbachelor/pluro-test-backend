const path = require('path')
exports.isFileHTML = (fileName) => {
    if (!['.html', '.htm'].includes(path.extname(fileName))){
        return false;
    }
    return true;
}