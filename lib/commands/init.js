const validate = require("validate-npm-package-name")
const prompt = require("prompts")
const semver = require("semver")
const fs = require("fs")
const locale = require("../locale.js")
const kleur = require("kleur")

async function init() {
    const questions = [
        {
            type: "text",
            name: "name",
            message: locale["init"]["questions"][0],
            initial: "package",
            validate: value => !validate(value).validForNewPackages ? translate.initValidates()[0] : true
        },
        {
            type: "text",
            name: "version",
            message: locale["init"]["questions"][1],
            initial: "1.0.0",
            validate: value => !semver.valid(value) ? translate.initValidates()[1] : true
        },
        {
            type: "text",
            name: "description",
            message: locale["init"]["questions"][2],
            initial: ""
        },
        {
            type: "text",
            name: "main",
            message: locale["init"]["questions"][3],
            initial: "index.js"
        },
        {
            type: "text",
            name: "author",
            message: locale["init"]["questions"][4],
            initial: "nickname"
        }
    ]
    const response = await prompt(questions)
    if (Object.keys(response).length == 5) {
        if (!fs.existsSync(`./${response.name}`)) {
            fs.mkdirSync(`./${response.name}`)
        }
        fs.writeFileSync(`./${response.name}/${response.main}`, "console.log(\"Hello, world!\")")
        const json = {
            "name": response.name,
            "version": response.version,
            "description": response.description,
            "main": response.main,
            "keywords": [],
            "author": response.author,
            "license": "ISC"
        }
        fs.writeFileSync(`./${response.name}/package.json`, JSON.stringify(json, null, 4))
        console.log(kleur.green("√ ") + locale["init"]["succeed"])
    }
}

module.exports = init