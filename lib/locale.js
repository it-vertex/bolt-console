const path = require("path")
const config = require(path.join(__dirname, "../config/config.json"))

const locale = require(`../config/locales/${config.lang}.json`)
module.exports = locale