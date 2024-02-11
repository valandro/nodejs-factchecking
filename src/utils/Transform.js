"use strict";
const fs = require('fs');

const readJsonFile = (fileName) => {
    try {
        const data = fs.readFileSync(fileName, 'utf8');
        return JSON.parse(data);
      } catch (error) {
        console.log(error)
        return [];
      }
}

const file = readJsonFile('merged.json')
let resultJson = []
file.forEach(el => {
    el['raw_content'].forEach((content) => {
        if (content !== " ") {
            resultJson.push({
                'score': el['score'],
                'title': el['title'],
                'author': el['author'],
                'publish_date': el['publish_date'],
                'content': content
            })
        }
    })
})

const jsonData = JSON.stringify(resultJson, null, 2);
fs.writeFileSync('out.json', jsonData);

