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
        pacote.manifest(`${yargs.argv._[1]}@latest`).then(async (manifest) => {
            const iS = ora("Installing package...").start()
            await pacote.tarball.file(manifest.dist.tarball, `./cache/${yargs.argv._[1]}.tgz`).then(() => {
                pacote.extract(`./cache/${yargs.argv._[1]}.tgz`, `./cache/${yargs.argv._[1]}`).then(() => {
                    fs.unlinkSync(`./cache/${yargs.argv._[1]}.tgz`)
                    const package = JSON.parse(fs.readFileSync("./package.json"))
                    package.dependencies[yargs.argv._[1]] = `^${manifest.version}`
                    fs.writeFileSync("./package.json", JSON.stringify(package, null, 4))
                })
            })
            iS.succeed()
            /* if (Object.keys(manifest.dependencies).length == 0) return
            const iD = ora("Installing dependencies...").start()
            for (let i = 0; i < Object.keys(manifest.dependencies).length; i++) {
                const version = manifest.dependencies[Object.keys(manifest.dependencies)[i]].includes("^") ? manifest.dependencies[Object.keys(manifest.dependencies)[i]].replace("^", "") : manifest.dependencies[Object.keys(manifest.dependencies)[i]]
                await pacote.manifest(`${Object.keys(manifest.dependencies)[i]}@${version}`).then(async (manifest) => {
                    console.log(manifest)
                    await pacote.tarball.file(manifest.dist.tarball, `./cache/${Object.keys(manifest.dependencies)[i]}.tgz`).then(async () => {
                        await pacote.extract(`./cache/${Object.keys(manifest.dependencies)[i]}.tgz`, `./cache/${Object.keys(manifest.dependencies)[i]}`).then(() => {
                            fs.unlinkSync(`./cache/${Object.keys(manifest.dependencies)[i]}.tgz`)
                        })
                    })
                })
            }
            iD.succeed() */
        })
        break
    default:
        yargs.showHelp()
}