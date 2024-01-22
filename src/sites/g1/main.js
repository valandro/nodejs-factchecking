"use strict";

const Page = require('./Page');
const Scraping = require('./Scraping');
const File = require('../../utils/file');

(async () => {
    Page.walkThrough(`https://g1.globo.com/fato-ou-fake/`)
    .then(res => {
        console.log(`result links ${Array.from(res)[0]}`);
        Scraping.walkThrough(Array.from(res)).then(res => {
            File.writeFile(`./src/sites/g1//result/file.json`, res)
        })
    })
}
)()