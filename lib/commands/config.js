// modules
const prompt = require("prompts")
const locale = require("../locale.js")
const kleur = require("kleur")
const path = require("path")

// config
const lang = require("./config/lang.js")
const mt = require("./config/mt.js")
const json = require(path.join(__dirname, "../../config/config.json"))

async function config() {
    const { choice } = await prompt({
        type: "select",
        name: "choice",
        message: locale["config"]["message"],
        hint: locale["cmd"]["hint"],
        choices: [
            { title: `${locale["config"]["lang"]["description"]} ${kleur.dim(locale["config"]["lang"]["locales"][json["lang"]])}`, value: "lang" },
            { title: `${locale["config"]["multi-threading"]["description"]} ${kleur.dim(json["multi-threading"] ? "true" : "false")}`, value: "multi-threading" },
            { title: kleur.dim(locale["config"]["exit"]) }
        ]
    })
    if (choice == "lang") {
        lang()
    } else if (choice == "multi-threading") {
        mt()
    }
}

module.exports = config