const ora = require("ora")
const exec = require("node-async-exec")
const kleur = require("kleur")
const locale = require("../locale.js")

async function update() {
    const spinner = ora(locale["update"]["loading"])
    spinner.start()
    await exec({ cmd: "npm i -g ." })
    spinner.stop()
    console.log(kleur.green("√ ") + locale["update"]["loading"])
    console.log(kleur.green("√ ") + locale["update"]["updated"])
}

module.exports = update