const translate = require("./translate.js")
const fsR = require("fs").promises
const prompt = require("prompts")

async function lang() {
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
}

module.exports = lang