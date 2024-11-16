const axios = require('axios')
const cheerio = require('cheerio')

class AlkitabAPI {
/*

di buat oleh kaze:)

*/
    constructor() {
        this.chapterMap = {}
    }

    async getChapters(version, book, chapter, verseNumber) {
        const items = this.chapterMap[`${version}:${book}:${chapter}`]
        if (items && items.length) {
            let result = items
            if (verseNumber) {
                result = items.filter(item => item.verse === verseNumber)
            }
            return {
                verses: result,
                book,
                chapter,
                version,
            }
        } else {
            return this.fetchChapters(version, book, chapter, verseNumber)
        }
    }

    async fetchChapters(version, book, chapter, verseNumber) {
        const url = `http://alkitab.mobi/${version}/${book}/${chapter}`
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)
        let items = []
        let lastVerse = 0

        $('p').filter((i, el) => {
            let data = $(el)
            let content = data.find('[data-begin]').first().text()
            let title = data.find('.paragraphtitle').first().text()
            let verse = parseInt(data.find('.reftext').children().first().text(), 10) || 0
            let order = i
            let type = null

            if (!title && !content) {
                data.find('.reftext').remove()
                content = data.text()
            }

            if (title) {
                type = 'title'
                content = title
                verse = lastVerse + 1
            } else if (content) {
                type = 'content'
                lastVerse = verse
            }

            if (data.attr('hidden') === 'hidden' || data.hasClass('loading') || data.hasClass('error')) {
                type = null
            }

            if (type) {
                items.push({ content, type, verse, book, chapter, version, order })
            }
            return type
        })

        this.chapterMap[`${version}:${book}:${chapter}`] = items
        let result = items
        if (verseNumber) {
            result = items.filter(item => item.verse === verseNumber)
        }
        return {
            verses: result,
            book,
            chapter,
            version,
        }
    }
}


const alkitab = new AlkitabAPI() 
 
module.exports = { alkitab }