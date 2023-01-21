#!/usr/bin/env node

// packages
const exec = require("node-async-exec")
const prompt = require("prompts")
const fsR = require("fs").promises
const fs = require("fs")
const kleur = require("kleur")
const yargs = require("yargs")
const ora = require("ora")
const validate = require("validate-npm-package-name")
const semver = require("semver")

// utils
const translate = require("./translate")
const config = require("./config.json")

const options = yargs
    .locale(config.lang)
    .command("init", translate.initDescription())
    .command("lang", translate.langDescription())
    .command("update", translate.updateDescription())
    .scriptName(kleur.dim("• bolt"))
    .version(false)
    .help(false)
    .updateLocale({ "Commands:": translate.command() })
    .argv

const command = yargs.argv._[0]
if (command == "lang") {
    (async () => {
        const response = await prompt({
            type: "select",
            name: "lang",
            message: translate.langMessage(),
            hint: translate.langHint(),
            choices: [
                { title: translate.langEnglish(), value: "en_US" },
                { title: translate.langRussian(), value: "ru_RU" },
                { title: translate.langUkrainian(), value: "uk_UA" }
            ]
        })
        if (!response.lang) return
        const json = require("./config.json")
        json.lang = response.lang
        await fsR.writeFile(__dirname + "/config.json", JSON.stringify(json, null, 4))
        console.log(translate.langChanged(response.lang))
    })()
} else if (command == "update") {
    (async () => {
        const spinner = ora(translate.updateLoading())
        spinner.start()
        await exec({ cmd: "npm i -g ." })
        spinner.stop()
        console.log(kleur.green("√ ") + translate.updateLoading())
        console.log(kleur.green("√ ") + translate.updateUpdated(yargs.locale()))
    })()
} else if (command == "init") {
    (async () => {
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
    })()
} else yargs.showHelp()