https://www.estadao.com.br/pf/api/v3/content/fetch/story-feed-query?query={%22body%22:%22{\%22query\%22:{\%22bool\%22:{\%22must\%22:[{\%22term\%22:{\%22type\%22:\%22story\%22}},{\%22term\%22:{\%22revision.published\%22:1}},{\%22nested\%22:{\%22path\%22:\%22taxonomy.sections\%22,\%22query\%22:{\%22bool\%22:{\%22must\%22:[{\%22regexp\%22:{\%22taxonomy.sections._id\%22:\%22.*estadao-verifica.*\%22}}]}}}}]}}}%22,%22included_fields%22:%22_id,canonical_url%22,%22offset%22:%220%22,%22query%22:%22%22,%22size%22:100,%22sort%22:%22first_publish_date:asc%22}&d=1108&_website=estadao

API call para Estadao

https://www.estadao.com.br/pf/api/v3/content/fetch/story-feed-query?query={%22included_fields%22:%22_id,canonical_url%22,%22offset%22:%221701%22,%22query%22:%22%22,%22size%22:100,%22sort%22:%22first_publish_date:desc%22}

Ajustar parametro de offset e size para recuperar as notícias

Script para montar arquivo CSV com base no raw_sites

const data = File.readJsonFile('./src/sites/estadao/raw_sites')
data['content_elements'].forEach(it => {
    console.log('https://www.estadao.com.br'+it['canonical_url'])
})