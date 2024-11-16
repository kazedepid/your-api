const axios = require("axios")
const cheerio = require('cheerio')


async function tvOneSearch(query) {
/*
By Fruatre
wa.me/6285817597752
Saluran : https://whatsapp.com/channel/0029VaNR2B6BadmioY6mar3N
*/
    const ress = await axios.get(`https://www.tvonenews.com/cari?q=${query}`);
    const $ = cheerio.load(ress.data);
    let data = [];

    $('div.article-list-info.content_center').each((i, el) => {
        const title = $(el).find('h2').text().trim();
        const link = $(el).find('a').attr('href');
        const time = $(el).find('li.ali-date.content_center').text().trim();
        const desc = $(el).find('div.ali-desc').text().trim();

        if (title && time && link && desc) {
            data.push({
                title: title,
                url: link,
                waktu: time,
                description: desc
            });
        }
    });

    return data;
}

async function tvOneLatest() {
    const ress = await axios.get('https://www.tvonenews.com/');
    const $ = cheerio.load(ress.data);
    let data = [];

    $('div.article-list-info.content_center').each((i, el) => {
        const title = $(el).find('h2').text().trim();
        const link = $(el).find('a').attr('href');
        const time = $(el).find('li.ali-date.content_center').text().trim();
        const desc = $(el).find('div.ali-desc').text().trim();

        if (title && time && link && desc) {
            data.push({
                title: title,
                url: link,
                waktu: time,
                description: desc
            });
        }
    });

    return data;
}

module.exports = { tvOneSearch, tvOneLatest }