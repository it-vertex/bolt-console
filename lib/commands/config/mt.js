const prompt = require("prompts")
const path = require("path")
const locale = require("../../locale.js")
const kleur = require("kleur")
const fsR = require("fs").promises

async function mt() {
    const { mt } = await prompt({
        type: "select",
        name: "mt",
        message: locale["config"]["multi-threading"]["message"],
        hint: locale["cmd"]["hint"],
        choices: [
            { title: locale["config"]["multi-threading"]["choices"][0], value: false },
            { title: locale["config"]["multi-threading"]["choices"][1], value: true },
            { title: kleur.dim(locale["config"]["back"]) }
        ]
    })
    if (mt == 2) return require("../config.js")()
    if (mt == undefined) return
    const json = require(path.join(__dirname, "../../../config/config.json"))
    json["multi-threading"] = mt
    await fsR.writeFile(path.join(__dirname, "../../../config/config.json"), JSON.stringify(json, null, 4))
    console.log(locale["config"]["multi-threading"][mt ? "enabled" : "disabled"])
}

module.exports = mt