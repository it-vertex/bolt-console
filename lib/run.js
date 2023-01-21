const cp = require("child_process")
const fs = require("fs")
const yargs = require("yargs")

async function run() {
    if (!fs.existsSync("./package.json")) return
    const package = JSON.parse(fs.readFileSync("./package.json"))
    const scriptName = yargs.argv._[1]
    if (package.scripts[scriptName]) {
        cp.exec(package.scripts[scriptName], (error, stdout, stderr) => {
            console.log(stdout)
            console.log(stderr)
            if (error) {
                console.log('exec error: ' + error)
            }
        })
    }
}

module.exports = run