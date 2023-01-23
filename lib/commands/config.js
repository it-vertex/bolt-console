const fsR = require("fs").promises
const prompt = require("prompts")
const path = require("path")
const locale = require("../locale.js")
const kleur = require("kleur")

async function config() {
    const json = require(path.join(__dirname, "../../config/config.json"))
    const { choice } = await prompt({
        type: "select",
        name: "choice",
        message: locale["config"]["message"],
        hint: locale["cmd"]["hint"],
        choices: [
            { title: "Change lang", value: "lang" },
            { title: `Multi-threading: ${kleur.dim(json["multi-threading"] ? "true" : "false")}`, value: "multi-threading" },
            { title: kleur.dim("Back") }
        ]
    })
    if (choice == "lang") {
        const { lang } = await prompt({
            type: "select",
            name: "lang",
            message: locale["config"]["lang"]["message"],
            hint: locale["cmd"]["hint"],
            choices: [
                { title: locale["config"]["lang"]["locales"]["en_US"], value: "en_US" },
                { title: locale["config"]["lang"]["locales"]["pl_PL"], value: "pl_PL" },
                { title: locale["config"]["lang"]["locales"]["ru_RU"], value: "ru_RU" },
                { title: locale["config"]["lang"]["locales"]["uk_UA"], value: "uk_UA" }
            ]
        })
        if (!lang) return
        json["lang"] = lang
        await fsR.writeFile(path.join(__dirname, "../../config/config.json"), JSON.stringify(json, null, 4))
        console.log(require(`../../config/locales/${lang}.json`)["config"]["lang"]["changed"])
    } else if (choice == "multi-threading") {
        const { mt } = await prompt({
            type: "select",
            name: "mt",
            message: locale["config"]["multi-threading"]["message"],
            hint: locale["cmd"]["hint"],
            choices: [
                { title: "false", value: false },
                { title: "true", value: true }
            ]
        })
        if (mt == undefined) return
        json["multi-threading"] = mt
        await fsR.writeFile(path.join(__dirname, "../../config/config.json"), JSON.stringify(json, null, 4))
        console.log(locale["config"]["multi-threading"][mt ? "enabled" : "disabled"])
    }
}

module.exports = config