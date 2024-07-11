"use strict";

const { title } = require('process');
const File = require('./src/utils/file');
const fs = require('fs');
var args = process.argv.slice(2);
const page = args[0];
const startIndex = page * 5;
const endIndex = startIndex + 5;

(async () => {
    // console.log(`ARGV PAGE ${page}`);
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

    // const fakeData = File.readJsonFile('./final_dataset.json');
    const newsData = File.readJsonFile('./full_dataset_compiled.json');
    let newData = []
    for (let data in newsData) {
        let publish_date = getPublishDateIfExists(newsData[data]['title'], newsData[data]['author']);
        console.log(publish_date);
        newData.push({
            'score': newsData[data]['score'],
            'title': newsData[data]['title'],
            'author': newsData[data]['author'],
            'content': newsData[data]['content'],
            'publish_date': publish_date
        })
    } 
    console.log(newData[0])
    File.writeFile('./full_dataset_compiled_publish_date.json', newData);
    // File.writeFile('./full_dataset.json', newsData);
}
)()

function getPublishDateIfExists(title, author) {
    if (File.getPublishDateIfExists('./src/sites/aosfatos/result/false.json', author, title) != null) {
        return File.getPublishDateIfExists('./src/sites/aosfatos/result/false.json', author, title);
    } else if (File.getPublishDateIfExists('./src/sites/aosfatos/result/true.json', author, title) != null) {
        return File.getPublishDateIfExists('./src/sites/aosfatos/result/true.json', author, title);
    } else if (File.getPublishDateIfExists('./src/sites/g1/result/file-g1.json', author, title) != null) {
        return File.getPublishDateIfExists('./src/sites/g1/result/file-g1.json', author, title);
    } else if (File.getPublishDateIfExists('./src/sites/estadao/result/file.json', author, title) != null) {
        return File.getPublishDateIfExists('./src/sites/estadao/result/file.json', author, title);
    } else if (File.getPublishDateIfExists('./src/sites/estadao/result/new-sites-result.json', author, title) != null) {
        return File.getPublishDateIfExists('./src/sites/estadao/result/new-sites-result.json', author, title)
    } else if (File.getPublishDateIfExists('./src/sites/estadao/result/sites-true-result.json', author, title) != null) {
        return File.getPublishDateIfExists('./src/sites/estadao/result/sites-true-result.json', author, title);
    }
    return "FUDEUUUUUU";
}