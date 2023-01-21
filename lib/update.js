const ora = require("ora")
const exec = require("node-async-exec")
const translate = require("./translate.js")
const kleur = require("kleur")
const yargs = require("yargs")

async function update() {
    const spinner = ora(translate.updateLoading())
    spinner.start()
    await exec({ cmd: "npm i -g ." })
    spinner.stop()
    console.log(kleur.green("√ ") + translate.updateLoading())
    console.log(kleur.green("√ ") + translate.updateUpdated(yargs.locale()))
}

module.exports = update