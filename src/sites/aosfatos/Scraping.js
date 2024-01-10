/**
 * Main function to consume messages from seeds topic.
 *
 * @author Lucas Valandro
 */
"use strict";
require('events').EventEmitter.defaultMaxListeners = 0
const puppeteer = require('puppeteer');
const DateConverter = require('../../utils/dateConverter')

const start = new Date().getTime();

module.exports.walkThrough = function (links) {
    return Promise.all(links.map(url => querySite(url)))
}

function querySite(url) {
    return new Promise((resolve, reject) => {
        (async () => {
            const browser = await puppeteer.launch({ headless: "new", timeout: 0 });
            const __page = await browser.newPage();
            __page.setDefaultNavigationTimeout(0);
            console.log(`URL ${url}`)
            await __page.goto(url, { waitUntil: 'load', timeout: 0 });

            // Remove empty strings
            const title = await __page.waitForSelector('.ck-article > h1', {visible: true});
            const content = (await __page.evaluate(() => Array.from(document.querySelectorAll('.ck-article > p'), p => p.textContent))).filter(it => it !== "");
            const author = await __page.waitForSelector('.author', {visible: true});
            const publishDate = await __page.waitForSelector('.publish-date', {visible: true});
            const titleText = await __page.evaluate(el => el.textContent, title)
            const authorText = await __page.evaluate(el => el.textContent, author)
            const publishDateText = await __page.evaluate(el => el.textContent, publishDate)

            const dateFormated = publishDateText.replace('\n', '').replace(',', '').replace('de\n', '').split(' ').filter(it => it !== "")
            const date = DateConverter.dateConverter(dateFormated)

            console.log(titleText)
            console.log(authorText)
            console.log(date)
            console.log(content)

            await browser.close();

            const end = new Date().getTime();
            const time = end - start;
            console.log(`Execution ${url} time: ${time}`);

            return {
                'title': titleText,
                'author': authorText,
                'publish_date': date,
                'raw_content': content
            }
        })()
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}