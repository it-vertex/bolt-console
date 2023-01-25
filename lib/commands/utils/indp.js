const fs = require("fs")
const pacote = require("pacote")

async function indp(mf) {
    for (let i = 0; i < Object.keys(mf.dependencies).length; i++) {
        const version = mf.dependencies[Object.keys(mf.dependencies)[i]].includes("^") ? mf.dependencies[Object.keys(mf.dependencies)[i]].replace("^", "") : mf.dependencies[Object.keys(mf.dependencies)[i]]
        await pacote.manifest(`${Object.keys(mf.dependencies)[i]}@${version}`).then(async (manifest) => {
            await pacote.tarball.file(manifest.dist.tarball, `./node_modules/${Object.keys(mf.dependencies)[i]}.tgz`).then(async () => {
                await pacote.extract(`./node_modules/${Object.keys(mf.dependencies)[i]}.tgz`, `./node_modules/${Object.keys(mf.dependencies)[i]}`).then(async () => {
                    fs.unlinkSync(`./node_modules/${Object.keys(mf.dependencies)[i]}.tgz`)
                    if (!manifest.dependencies) return
                    await indp(manifest)
                })
            })
        })
    }
}

module.exports = indp