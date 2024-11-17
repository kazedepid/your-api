const axios = require('axios')
const cheerio = require('cheerio')

async function ttp(text) {
/*

di buat oleh kaze:)

*/
    try {
        const { data } = await axios.post("https://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect", new URLSearchParams({
            TextToRender: text,
            FontSize: "100",
            Margin: "30",
            LayoutStyle: "0",
            TextRotation: "0",
            TextColor: "ffffff",
            TextTransparency: "0",
            OutlineThickness: "3",
            OutlineColor: "000000",
            FontName: "Lekton",
            ResultType: "view",
        }).toString())

        const $ = cheerio.load(data)
        return $('form[name="MyForm"] #idResultFile').map((_, el) => 'https://www.picturetopeople.org' + $(el).val()).get()
    } catch (error) {
        console.error('Error:', error)
        return []
    }
}

async function shortenUrl(url) {
    try {
        const { data } = await axios.post("https://www.shorturl.at/shortener.php", new URLSearchParams({ u: url }))
        return data.split('value="')[1].split('"')[0]
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = { ttp, shortenUrl }
