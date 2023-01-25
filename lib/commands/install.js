const fs = require("fs")
const yargs = require("yargs")
const pacote = require("pacote")
const ora = require("ora")
const indp = require("./utils/indp.js")

async function install() {
    await pacote.manifest(`${yargs.argv._[1]}@latest`).then(async (manifest) => {
        const iS = ora("Installing package...").start()
        await pacote.tarball.file(manifest.dist.tarball, `./cache/${yargs.argv._[1]}.tgz`).then( async() => {
            await pacote.extract(`./cache/${yargs.argv._[1]}.tgz`, `./cache/${yargs.argv._[1]}`).then(() => {
                fs.unlinkSync(`./cache/${yargs.argv._[1]}.tgz`)
                const package = JSON.parse(fs.readFileSync("./package.json"))
                package.dependencies[yargs.argv._[1]] = `^${manifest.version}`
                fs.writeFileSync("./package.json", JSON.stringify(package, null, 4))
            })
        })
        iS.succeed()
        if (!manifest.dependencies) return
        const iD = ora("Installing dependencies...").start()
        await indp(manifest)
        iD.succeed()
    })
}

module.exports = install