"use strict";

const Page = require('./Page');
const Scraping = require('./Scraping');
const File = require('../../utils/file');
const fs = require('fs');
var args = process.argv.slice(2);
const page = args[0];
const startIndex = page * 5;
const endIndex = startIndex + 5;

(async () => {
    const links = File.readCsvFile('./src/sites/estadao/sites-without-duplicates.csv');
    const selectedLinks = links.splice(startIndex, endIndex - startIndex + 1);
    Scraping.walkThrough(selectedLinks).then(res => {
        File.writeFile(`./src/sites/estadao/result/file.json`, res)
    })
}
)()
