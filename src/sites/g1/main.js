"use strict";

const Page = require('./Page');
const Scraping = require('./Scraping');
const File = require('../../utils/file');
var args = process.argv.slice(2);
var page = args[0];
const fixedNewsSize = 100;
const crawlers = 1;

(async () => {
    console.time('Elapsed time');
    if (typeof page === 'undefined') {
        page = 1;
    }

    const urlPromises = [];
    // const urlPromises2 = [];

    let i;
    for (i = page; i <= page + 13; i++) {
        urlPromises.push(Page.walkThrough(`https://g1.globo.com/fato-ou-fake/index/feed/pagina-${i}.ghtml`))
    }

    let urlResults = await Promise.all(urlPromises);

    // for (let j = i; j <= i + 13; j++) {
    //     urlPromises2.push(Page.walkThrough(`https://g1.globo.com/fato-ou-fake/index/feed/pagina-${j}.ghtml`))
    // }

    // let urlResults2 = await Promise.all(urlPromises2);
    // urlResults.push(...urlResults2);
    const urlResultsSliced = urlResults.flat(Infinity).slice(0, fixedNewsSize);
    const slicedUrls = await dividirArrayEmTamanhosFixos(urlResultsSliced, crawlers);
    for (let sliced of slicedUrls) {
        const pagesResult = await Scraping.walkThrough(Array.from(sliced).flat(Infinity));
        await File.writeFile(`./src/sites/g1/result/new-test.json`, pagesResult.flat(Infinity));
    }
    console.timeEnd('Elapsed time');
    console.log(`Total news: ${Array.from(urlResultsSliced).flat(Infinity).length}`);
    // for (let i = page; i <= page + 10; i++) {
    //     Page.walkThrough(`https://g1.globo.com/fato-ou-fake/index/feed/pagina-${i}.ghtml`)
    //     .then(res => {
    //         console.log(`Total news: ${Array.from(res).flat(Infinity).length}`);
    //         Scraping.walkThrough(Array.from(res)).then(res => {
    //             File.writeFile(`./src/sites/g1/result/file.json`, res.flat(Infinity))
    //             console.timeEnd('Elapsed time');
    //         })
    //     })
    // }
}
)()

async function dividirArrayEmTamanhosFixos(array, tamanho) {
    if (tamanho <= 0) {
        throw new Error('O tamanho do sub-array deve ser maior que zero.');
    }

    let resultado = [];
    for (let i = 0; i < array.length; i += tamanho) {
        resultado.push(array.slice(i, i + tamanho));
    }

    return resultado;
}