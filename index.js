global.adUrl = "https://gist.githubusercontent.com/kazedepid/c20b4355e58044eb0cde5b5f232ff4a1/raw/8b0c8d6bd51a30b26fd7e3b35ec72747d34370c5/adsku.json"

module.exports = {
  downloaders: require('./lib/downloader.js'),
  ai: require('./lib/ai.js'),
  religion: require('./lib/religion.js'),
  search: require('./lib/searching.js'),
  tools: require('./lib/tools.js')
}
