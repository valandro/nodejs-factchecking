const fs = require('fs');

const readJsonFile = (fileName) => {
    try {
      const data = fs.readFileSync(fileName, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  };

const writeObjectToFile = (fileName, data) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(fileName, jsonData);
};

module.exports.writeFile = function(fileName, data) {
    let file = readJsonFile(fileName)
    file.push(...data);
    writeObjectToFile(fileName, file)
}