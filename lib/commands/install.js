const fs = require("fs")
const yargs = require("yargs")
const pacote = require("pacote")
const ora = require("ora")
const indp = require("./utils/indp.js")
const kleur = require("kleur")
const locale = require("../locale.js")

async function install() {
    await pacote.manifest(`${yargs.argv._[1]}@latest`).then(async (manifest) => {
        const startTime = performance.now()
        const iS = ora(locale["install"]["installingPackage"]).start()
        await pacote.tarball.file(manifest.dist.tarball, `./node_modules/${yargs.argv._[1]}.tgz`).then( async() => {
            await pacote.extract(`./node_modules/${yargs.argv._[1]}.tgz`, `./node_modules/${yargs.argv._[1]}`).then(() => {
                fs.unlinkSync(`./node_modules/${yargs.argv._[1]}.tgz`)
                const package = JSON.parse(fs.readFileSync("./package.json"))
                package.dependencies[yargs.argv._[1]] = `^${manifest.version}`
                fs.writeFileSync("./package.json", JSON.stringify(package, null, 4))
            })
        })
        iS.stop()
        console.log(kleur.green("√ ") + locale["install"]["installedPackage"])
        const iD = ora(locale["install"]["installingDependencies"]).start()
        if (manifest.dependencies) await indp(manifest)
        iD.stop()
        console.log(kleur.green("√ ") + locale["install"]["installedDependencies"])
        const endTime = performance.now()
        console.log(`\n${kleur.green("√")} ${locale["install"]["done"]} ${((endTime - startTime) / 1000).toFixed(2)}sec.`)
    })
}

module.exports = install