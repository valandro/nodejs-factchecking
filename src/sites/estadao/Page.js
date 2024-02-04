/**
 * Main function to consume messages from seeds topic.
 *
 * @author Lucas Valandro
 */
"use strict";
require('events').EventEmitter.defaultMaxListeners = 0
const puppeteer = require('puppeteer');
const fs = require('fs')

const start = new Date().getTime();

module.exports.walkThrough = function (link) {
    return queryPage(link)
}

function queryPage(link) {
    return new Promise((resolve, reject) => {
        (async () => {
            const browser = await puppeteer.launch({ headless: "new", timeout: 0 });
            const __page = await browser.newPage();
            await __page.goto(link, { waitUntil: 'load', timeout: 0 });
        
            for (let i = 0; i < 35; i++) {
                await __page.click('.see-more');
                await __page.waitForTimeout(500);
            } 

            const links = (await __page.evaluate(() => Array.from(document.querySelectorAll('.noticias-mais-recenter--item > a'), a => a.href))).filter(it => it !== "");

            console.log(links.length)

            await __page.screenshot({ path: 'fullpage.png', fullPage: true });
            await browser.close();

            let data = links
    
            console.log(links)

            const end = new Date().getTime();
            const time = end - start;
            console.log(`Execution ${link} time: ${time}`);
            return data
        })()
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}