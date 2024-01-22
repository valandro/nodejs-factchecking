"use strict";

const Page = require('./Page');
const Scraping = require('./Scraping');
const score = false;
const File = require('../../utils/file');
const page = 7;

(async () => {
    for (let i = page; i <= page + 1; i++) {
        Page.walkThrough(`https://www.aosfatos.org/noticias/checamos/falso/?page=${i}`)
        .then(res => {
            console.log(`result links ${Array.from(res)[0]}`);
            Scraping.walkThrough(Array.from(res), score).then(res => {
                File.writeFile(`./src/sites/aosfatos/result/${score}.json`, res)
            })
        })
    }
}
)()