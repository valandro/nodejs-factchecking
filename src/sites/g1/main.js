"use strict";

const Page = require('./Page');
const Scraping = require('./Scraping');
const File = require('../../utils/file');
var args = process.argv.slice(2);
const page = args[0];

(async () => {
    for (let i = page; i <= page; i++) {
        Page.walkThrough(`https://g1.globo.com/fato-ou-fake/index/feed/pagina-${i}.ghtml`)
        .then(res => {
            console.log(`result links ${Array.from(res)[0]}`);
            Scraping.walkThrough(Array.from(res)).then(res => {
                File.writeFile(`./src/sites/g1/result/file.json`, res.flat(Infinity))
            })
        })
    }
}
)()