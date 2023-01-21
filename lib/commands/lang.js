const fsR = require("fs").promises
const prompt = require("prompts")
const path = require("path")
const locale = require("../locale.js")

async function lang() {
    const response = await prompt({
        type: "select",
        name: "lang",
        message: locale["lang"]["message"],
        hint: locale["lang"]["hint"],
        choices: [
            { title: locale["lang"]["locales"]["en_US"], value: "en_US" },
            { title: locale["lang"]["locales"]["ru_RU"], value: "ru_RU" },
            { title: locale["lang"]["locales"]["uk_UA"], value: "uk_UA" }
        ]
    })
    if (!response.lang) return
    const json = require(path.join(__dirname, "../../config/config.json"))
    json.lang = response.lang
    await fsR.writeFile(path.join(__dirname, "../../config/config.json"), JSON.stringify(json, null, 4))
    console.log(require(`../../config/locales/${response.lang}.json`)["lang"]["changed"])
}

module.exports = lang