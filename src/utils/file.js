const fs = require('fs');

const readJson = (fileName) => {
    try {
      const data = fs.readFileSync(fileName, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  };

const readCsv = (fileName) => {
    try {
      const data = fs.readFileSync(fileName, 'utf8');
      
      return data.split('\n').filter(Boolean);
    } catch (error) {
      console.log(error)
      return [];
    }
  };

const writeObjectToFile = (fileName, data) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(fileName, jsonData);
};

module.exports.writeFile = function(fileName, data) {
    let file = readJson(fileName)
    file.push(...data);
    writeObjectToFile(fileName, file)
}

module.exports.readCsvFile = function(fileName) {
    return readCsv(fileName)
}

module.exports.readJsonFile = function(fileName) {
    return readJson(fileName)
}

module.exports.appendToCSV = function(data, fileName) {
  appendToCSV(data, fileName)
}

module.exports.getPublishDateIfExists = function(fileName, author, title) {
  let file = readJson(fileName)
  let publish_date = null
  file.forEach(element => {
    if (element != null && element['author'] == author && element['title'] == title) {
      publish_date = element['publish_date']
    }
  });
  return publish_date;
}

function appendToCSV(data, filename) {
  // Create a stream to append data to the file
  const stream = fs.createWriteStream(filename, { flags: 'a' });

  // Append the data to the file
  stream.write(data + '\n');

  // Close the stream
  stream.end();
}