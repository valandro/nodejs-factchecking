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
            console.log(`URL ${url}`);
            const browser = await puppeteer.launch({ headless: "new", timeout: 0 });
            const __page = await browser.newPage();
            try {
                __page.setDefaultNavigationTimeout(0);

                await __page.setExtraHTTPHeaders({
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
                    'upgrade-insecure-requests': '1',
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                    'accept-encoding': 'gzip, deflate, br',
                    'accept-language': 'en-US,en;q=0.9,en;q=0.8'
                })


                await __page.goto(url, { waitUntil: 'load', timeout: 0 });

                // const mainParagraph = await __page.evaluate(() => {
                //     const el = document.querySelector('div.news-body');
                //     return el.textContent;
                // });

                // const mistakeByEstadao = mainParagraph.includes('O Estadão Verifica investigou e concluiu que: é enganoso.');
                // const fakeByEstadao = mainParagraph.includes('O Estadão Verifica investigou e concluiu que: é falso');
                // const truthByEstadao = mainParagraph.includes('O Estadão Verifica investigou e concluiu que: é verdadeiro');

                // const falseByComprova = await __page.evaluate(() => {
                //     const elements = document.querySelectorAll('a');
                //     return Array.from(elements).filter(a => a.href == "https://projetocomprova.com.br/about/").map(a => a.textContent).some((el) => el == "Falso");
                // });

                // const linkScore = url.includes('e-enganoso') || url.includes('e-falso')

                // let score;
                // if (linkScore) {
                //     score = 0;
                // } else if(mistakeByEstadao || fakeByEstadao) {
                //     score = 0;
                // } else if (falseByComprova) {
                //     score = 0;
                // } else if (truthByEstadao) {
                //     score = 5;
                // } else {
                //     score = 3;
                // }
                let authorSelector = "";
                let authorIndex = 0;

                if (url.includes('paladar')) {
                    authorSelector = 'div > .name-authors'
                } else {
                    authorIndex = 1;
                    authorSelector = 'div.names > span'
                }

                const authorText = await __page.evaluate((authorSelector, authorIndex) => {
                    console.log(authorIndex)
                    console.log(authorSelector)
                    const el = document.querySelectorAll(authorSelector);
                    return el[authorIndex].textContent;
                }, authorSelector, authorIndex);

                let titleSelector = "";

                if (url.includes('paladar')) {
                    titleSelector = 'div > .container-headlines'
                } else {
                    titleSelector = 'div.container-news-informs > h1'
                }

                const title = await __page.evaluate((titleSelector) => {
                    const el = document.querySelector(titleSelector);
                    return el.textContent;
                }, titleSelector);

                const content = (await __page.evaluate(() => Array.from(document.querySelectorAll('.news-body > p'), p => p.textContent))).filter(it => it !== "");

                let dateSelector = "";

                if (url.includes('paladar')) {
                    dateSelector = 'span.publish-date'
                } else {
                    dateSelector = '.principal-dates > span > time'
                }

                const date = await __page.evaluate((dateSelector) => {
                    const el = document.querySelector(dateSelector);
                    return el.textContent;
                }, dateSelector);

                const dateText = DateConverter.dateEstadaoConverter(date);

                await browser.close();

                const end = new Date().getTime();
                const time = end - start;
                console.log(`Execution ${url} time: ${time}`); 

                return content.map(c => {
                    return {
                        'score': 5,
                        'title': title,
                        'author': authorText,
                        'publish_date': dateText,
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