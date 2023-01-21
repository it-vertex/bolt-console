const validate = require("validate-npm-package-name")
const translate = require("./translate.js")
const prompt = require("prompts")
const semver = require("semver")
const fs = require("fs")

async function init() {
    const questions = [
        {
            type: "text",
            name: "name",
            message: translate.initQuestions()[0],
            initial: "package",
            validate: value => !validate(value).validForNewPackages ? translate.initValidates()[0] : true
        },
        {
            type: "text",
            name: "version",
            message: translate.initQuestions()[1],
            initial: "1.0.0",
            validate: value => !semver.valid(value) ? translate.initValidates()[1] : true
        },
        {
            type: "text",
            name: "description",
            message: translate.initQuestions()[2],
            initial: ""
        },
        {
            type: "text",
            name: "main",
            message: translate.initQuestions()[3],
            initial: "index.js"
        },
        {
            type: "text",
            name: "author",
            message: translate.initQuestions()[4],
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
    } else {
        process.exit(1)
    }
}

module.exports = init