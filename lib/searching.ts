import axios from 'axios'
import cheerio from 'cheerio'

async function tvOneSearch(query: string): Promise<any[]> {
    const ress = await axios.get(`https://www.tvonenews.com/cari?q=${query}`)
    const $ = cheerio.load(ress.data)
    let data: any[] = []

    $('div.article-list-info.content_center').each((i, el) => {
        const title = $(el).find('h2').text().trim()
        const link = $(el).find('a').attr('href')
        const time = $(el).find('li.ali-date.content_center').text().trim()
        const desc = $(el).find('div.ali-desc').text().trim()

        if (title && time && link && desc) {
            data.push({
                title: title,
                url: link,
                waktu: time,
                description: desc
            })
        }
    })

    return data
}

async function tvOneLatest(): Promise<any[]> {
    const ress = await axios.get('https://www.tvonenews.com/')
    const $ = cheerio.load(ress.data)
    let data: any[] = []

    $('div.article-list-info.content_center').each((i, el) => {
        const title = $(el).find('h2').text().trim()
        const link = $(el).find('a').attr('href')
        const time = $(el).find('li.ali-date.content_center').text().trim()
        const desc = $(el).find('div.ali-desc').text().trim()

        if (title && time && link && desc) {
            data.push({
                title: title,
                url: link,
                waktu: time,
                description: desc
            })
        }
    })

    return data
}

async function randomCerpen(): Promise<any> {
    try {
        const { data } = await axios.get("https://cerpenmu.com/")
        const randomLink = cheerio.load(data)("#sidebar a").eq(Math.floor(Math.random() * 10)).attr("href")
        const { data: storyData } = await axios.get(randomLink)
        const $ = cheerio.load(storyData)
        const url = $("#content article h2 a").eq(Math.floor(Math.random() * 10)).attr("href")
        const { data: contentData } = await axios.get(url)
        const $$ = cheerio.load(contentData)

        return {
            status: true,
            title: $$("article h1").text().trim(),
            penulis: $$("article a:nth-child(2)").text().trim(),
            url,
            content: $$("article p").text().trim()
        }
    } catch {
        return { status: false }
    }
}

export { tvOneSearch, tvOneLatest, randomCerpen }