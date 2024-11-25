global.adUrl = "https://raw.githubusercontent.com/kajedevid/dbku/refs/heads/main/adsku.json";
global.pluginsUrl = "https://raw.githubusercontent.com/kajedevid/dbku/refs/heads/main/pluginsKu.json";

import religion from './lib/religion.js';
import search from './lib/searching.js';
import { ttp, shortenUrl } from './lib/tools.js';
import { blackbox } from './lib/ai.js';

export {
  religion,
  search,
  tools,
  ai
};