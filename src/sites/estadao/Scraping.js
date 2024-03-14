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
            try {
                const __page = await browser.newPage();
                __page.setDefaultNavigationTimeout(0);

                await __page.goto(url, { waitUntil: 'load', timeout: 0 });

                const mainParagraph = await __page.evaluate(() => {
                    const el = document.querySelector('div.news-body');
                    return el.textContent;
                });

                const mistakeByEstadao = mainParagraph.includes('O Estadão Verifica investigou e concluiu que: é enganoso.');
                const fakeByEstadao = mainParagraph.includes('O Estadão Verifica investigou e concluiu que: é falso');
                const truthByEstadao = mainParagraph.includes('O Estadão Verifica investigou e concluiu que: é verdadeiro');

                const falseByComprova = await __page.evaluate(() => {
                    const elements = document.querySelectorAll('a');
                    return Array.from(elements).filter(a => a.href == "https://projetocomprova.com.br/about/").map(a => a.textContent).some((el) => el == "Falso");
                });

                const linkScore = url.includes('e-enganoso') || url.includes('e-falso')

                let score;
                if (linkScore) {
                    score = 0;
                } else if(mistakeByEstadao || fakeByEstadao) {
                    score = 0;
                } else if (falseByComprova) {
                    score = 0;
                } else if (truthByEstadao) {
                    score = 5;
                } else {
                    score = 3;
                }
                
                const authorText = await __page.evaluate(() => {
                    const el = document.querySelectorAll('div.names > span');
                    return el[1].textContent;
                });

                const title = await __page.evaluate(() => {
                    const el = document.querySelector('div.container-news-informs > h1');
                    return el.textContent;
                });

                const content = (await __page.evaluate(() => Array.from(document.querySelectorAll('.news-body > p'), p => p.textContent))).filter(it => it !== "");

                const date = await __page.evaluate(() => {
                    const el = document.querySelector('.principal-dates > span > time');
                    return el.textContent;
                });

                const dateText = DateConverter.dateEstadaoConverter(date);

                await browser.close();

                const end = new Date().getTime();
                const time = end - start;
                console.log(`Execution ${url} time: ${time}`); 

                return content.map(c => {
                    return {
                        'score': score,
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