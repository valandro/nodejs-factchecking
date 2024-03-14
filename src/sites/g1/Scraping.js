/**
 * Main function to consume messages from seeds topic.
 *
 * @author Lucas Valandro
 */
"use strict";
require('events').EventEmitter.defaultMaxListeners = 0
const puppeteer = require('puppeteer');

const start = new Date().getTime();

module.exports.walkThrough = function (links) {
    return Promise.all(links.map(url => querySite(url)))
}

function querySite(url) {
    return new Promise((resolve, reject) => {
        (async () => {
            const browser = await puppeteer.launch({ headless: "new", timeout: 0 });
            try {
                const __page = await browser.newPage();
                __page.setDefaultNavigationTimeout(0);
                console.log(`URL ${url}`)
                await __page.goto(url, { waitUntil: 'load', timeout: 0 });

                // Remove empty strings
                const contextPath = url.match(/[^/]*.ghtml/g)[0]
                const factScore = contextPath.includes('fato')
                const fakeScore = contextPath.includes('fake')

                const author = await __page.waitForSelector('.content-publication-data__from', { visible: true });

                const title = await __page.evaluate(() => {
                    const el = document.querySelector('div.title > meta');
                    return el.getAttribute('content');
                });

                const content = (await __page.evaluate(() => Array.from(document.querySelectorAll('.content-text__container'), p => p.textContent))).filter(it => it !== "");

                const date = await __page.evaluate(() => {
                    const el = document.querySelector('.content-publication-data__updated > time');
                    return el.getAttribute('datetime');
                });

                const authorText = await __page.evaluate(el => el.textContent, author).then(el => el.split(',')[0].replace(' Por ', ''))

                await browser.close();

                const end = new Date().getTime();
                const time = end - start;
                console.log(`Execution ${url} time: ${time}`);

                let numberScore;
                if (factScore && fakeScore) {
                    numberScore = 3;
                } else if(factScore) {
                    numberScore = 5;
                } else if(fakeScore) {
                    numberScore = 0;
                }

                return content.map(c => {
                    return {
                        'score': numberScore,
                        'title': title,
                        'author': authorText,
                        'publish_date': date,
                        'raw_content': c
                    }  
                })
            } catch(err) {
                console.log(err)
                await browser.close();
                return null
            }
        })()
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}