/**
 * Main function to consume messages from seeds topic.
 *
 * @author Lucas Valandro
 */
"use strict";
require('events').EventEmitter.defaultMaxListeners = 0
const puppeteer = require('puppeteer');
const DateConverter = require('../../utils/dateConverter')
const Scraping = require('./Scraping')
const fs = require('fs')

const start = new Date().getTime();

module.exports.walkThrough = function (link) {
    return queryPage(link)
}

function queryPage(link) {
    return new Promise((resolve, reject) => {
        (async () => {
            // for (let pageCount = 2; pageCount <= 2; pageCount++) {
            
            // }
            const browser = await puppeteer.launch({ headless: "new", timeout: 0 });
            const __page = await browser.newPage();
            await __page.goto(link, { waitUntil: 'load', timeout: 0 });
        
            // Remove empty strings
            const links = (await __page.evaluate(() => Array.from(document.querySelectorAll('.infinite-container > a'), a => a.href))).filter(it => it !== "");
        
            console.log(links)
            // console.log(links)
    
            await browser.close();
    
            let data
            Scraping.walkThrough(links)
                .then(res =>
                    data = res
                )
    
            const end = new Date().getTime();
            const time = end - start;
            console.log(`Execution ${link} time: ${time}`);
            return data
        })()
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}