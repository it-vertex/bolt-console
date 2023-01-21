#!/usr/bin/env node

// packages
const yargs = require("yargs")

// config
const config = require("../config/config.json")

// lib/commands
const init = require("../lib/commands/init.js")
const lang = require("../lib/commands/lang.js")
const update = require("../lib/commands/update.js")

// lib
const locale = require("../lib/locale.js")

const options = yargs
    .locale(config.lang)
    .command("init", locale["init"]["description"])
    .command("lang", locale["lang"]["description"])
    .command("update", locale["update"]["description"])
    .scriptName("bolt")
    .version(false)
    .help(false)
    .updateLocale({ "Commands:": locale["cmd"]["command"] })
    .argv

switch (yargs.argv._[0]) {
    case "init":
        init()
        break
    case "lang":
        lang()
        break
    case "update":
        update()
        break
    default:
        yargs.showHelp()
}