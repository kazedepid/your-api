import axios from 'axios'
import cheerio from 'cheerio'

class AlkitabAPI {
    private chapterMap: Record<string, any[]> = {}

    async getChapters(version: string, book: string, chapter: number, verseNumber?: number) {
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

    private async fetchChapters(version: string, book: string, chapter: number, verseNumber?: number) {
        const url = `http://alkitab.mobi/${version}/${book}/${chapter}`
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)
        let items: any[] = []
        let lastVerse = 0

        $('p').filter((i, el) => {
            const data = $(el)
            let content = data.find('[data-begin]').first().text()
            let title = data.find('.paragraphtitle').first().text()
            let verse = parseInt(data.find('.reftext').children().first().text(), 10) || 0
            let order = i
            let type: string | null = null

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

export { alkitab }