#!/usr/bin/env node

// packages
const yargs = require("yargs")
const pkg = require("../package.json")
const pacote = require("pacote")
const fs = require("fs")
const ora = require("ora")

// config
const cfg = require("../config/config.json")

// lib/commands
const init = require("../lib/commands/init.js")
const config = require("../lib/commands/config.js")
const install = require("../lib/commands/install.js")
const update = require("../lib/commands/update.js")

// lib
const locale = require("../lib/locale.js")

const options = yargs
    .usage(`Using snapshot-${pkg.version}`)
    .locale(cfg.lang)
    .command("config", locale["config"]["description"])
    .command("init", locale["init"]["description"])
    .command("update", locale["update"]["description"])
    .scriptName("bolt")
    .version(false)
    .help(false)
    .updateLocale({ "Commands:": locale["cmd"]["command"] })
    .argv

switch (yargs.argv._[0]) {
    case "config":
        config()
        break
    case "init":
        init()
        break
    case "update":
        update()
        break
    case "install":
        install()
        break
    default:
        yargs.showHelp()
}