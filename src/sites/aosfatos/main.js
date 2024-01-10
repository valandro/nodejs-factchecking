"use strict";

const Page = require('./Page');

(async () => {
    for (let i = 1; i <= 8; i++) {
        Page.walkThrough(`https://www.aosfatos.org/noticias/checamos/falso/?page=${i}`).then(res => console.log(res))
    }
}
)()