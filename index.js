global.adUrl = "https://raw.githubusercontent.com/kajedevid/dbku/refs/heads/main/adsku.json"

module.exports = {
  downloaders: require('./lib/downloader.js'),
  ai: require('./lib/ai.js'),
  religion: require('./lib/religion.js'),
  search: require('./lib/searching.js'),
  tools: require('./lib/tools.js')
}
