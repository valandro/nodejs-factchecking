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
    console.log(`ARGV PAGE ${page}`);
    // const links = File.readCsvFile('./src/sites/estadao/sites-true.csv');
    // const selectedLinks = links.splice(startIndex, endIndex - startIndex + 1);
    // const filteredLinks = selectedLinks.filter(link => !link.includes('web-stories') && !link.includes('lourival'))
    // Scraping.walkThrough(filteredLinks).then(res => {
    //     File.writeFile(`./src/sites/estadao/result/sites-true-result.json`, res.flat(Infinity).filter(it => it != null))
    // })

    // const data = File.readJsonFile('./src/sites/estadao/raw_sites')
    // data['content_elements'].forEach(it => {
    //     console.log('https://www.estadao.com.br'+it['canonical_url'])
    // })
    // data['content_elements'].forEach(it => {
    //     File.appendToCSV('https://www.estadao.com.br'+it['canonical_url'], './src/sites/estadao/sites-true.csv')
    // })

    const fakeData = File.readJsonFile('./final_dataset.json');
    const newsData = File.readJsonFile('./src/sites/estadao/result/sites-true-result.json');
    File.writeFile('./full_dataset.json', fakeData);
    File.writeFile('./full_dataset.json', newsData);
}
)()
