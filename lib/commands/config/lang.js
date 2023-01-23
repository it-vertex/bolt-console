const prompt = require("prompts")
const path = require("path")
const locale = require("../../locale.js")
const kleur = require("kleur")
const fsR = require("fs").promises
const config = require("../config.js")

async function lang() {
    const { lang } = await prompt({
        type: "select",
        name: "lang",
        message: locale["config"]["lang"]["message"],
        hint: locale["cmd"]["hint"],
        choices: [
            { title: locale["config"]["lang"]["locales"]["en_US"], value: "en_US" },
            { title: locale["config"]["lang"]["locales"]["pl_PL"], value: "pl_PL" },
            { title: locale["config"]["lang"]["locales"]["ru_RU"], value: "ru_RU" },
            { title: locale["config"]["lang"]["locales"]["uk_UA"], value: "uk_UA" },
            { title: kleur.dim(locale["config"]["back"]) }
        ]
    })
    if (lang == 4) return require("../config.js")()
    if (!lang) return
    const json = require(path.join(__dirname, "../../../config/config.json"))
    json["lang"] = lang
    await fsR.writeFile(path.join(__dirname, "../../../config/config.json"), JSON.stringify(json, null, 4))
    console.log(require(`../../../config/locales/${lang}.json`)["config"]["lang"]["changed"])
}

module.exports = lang