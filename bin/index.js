#!/usr/bin/env node

// packages
const kleur = require("kleur")
const yargs = require("yargs")

// lib
const init = require("../lib/init.js")
const run = require("../lib/run.js")
const lang = require("../lib/lang.js")
const update = require("../lib/update.js")
const translate = require("../lib/translate.js")
const config = require("../lib/config.json")

const options = yargs
    .locale(config.lang)
    .command("init", translate.initDescription())
    .command("run", translate.runDescription())
    .command("lang", translate.langDescription())
    .command("update", translate.updateDescription())
    .scriptName(kleur.dim("• bolt"))
    .version(false)
    .help(false)
    .updateLocale({ "Commands:": translate.command() })
    .argv

const command = yargs.argv._[0]
if (command == "lang") {
    lang()
} else if (command == "update") {
    update()
} else if (command == "init") {
    init()
} else if (command == "run") {
    run()
} else yargs.showHelp()