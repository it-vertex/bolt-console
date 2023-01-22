const yargs = require("yargs")
const runScript = require("@npmcli/run-script")
const fs = require("fs")

function run() {
    const script = yargs.argv._[1]
    const package = JSON.parse(fs.readFileSync("./package.json"))
    if (!package.scripts[script]) return
    runScript({ event: script, path: "./" }).then((stdout) => {
        console.log(stdout.stderr)
    })
}

module.exports = run