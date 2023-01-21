const yargs = require("yargs")
const kleur = require("kleur")

// yargs locales

function command() {
    const locale = yargs.locale()
    if (locale == "en_US") {
        return kleur.dim("  Available commands:  ") + "\n"
    } else if (locale == "ru_RU") {
        return kleur.dim("  Доступные команды:  ") + "\n"
    } else if (locale == "uk_UA") {
        return kleur.dim("  Доступні команди:  ") + "\n"
    }
}

// bolt init

function initDescription() {
    const locale = yargs.locale()
    if (locale == "en_US") {
        return "Init new project"
    } else if (locale == "ru_RU") {
        return "Создать новый проект"
    } else if (locale == "uk_UA") {
        return "Створити новий проект"
    }
}

function initQuestions() {
    let list = []
    const locale = yargs.locale()
    if (locale == "en_US") {
        list.push("Package name")
        list.push("Package version")
        list.push("Package description")
        list.push("Package main file")
        list.push("Package author")
    } else if (locale == "ru_RU") {
        list.push("Имя пакета")
        list.push("Версия пакета")
        list.push("Описание пакета")
        list.push("Основной файл пакета")
        list.push("Автор пакета")
    } else if (locale == "uk_UA") {
        list.push("Назва пакета")
        list.push("Версія пакета")
        list.push("Опис пакета")
        list.push("Основний файл пакета")
        list.push("Автор пакета")
    }
    return list
}
function initValidates() {
    let list = []
    const locale = yargs.locale()
    if (locale == "en_US") {
        list.push("Invalid name")
        list.push("Invalid version")
    } else if (locale == "ru_RU") {
        list.push("Неверное имя")
        list.push("Неверная версия")
    } else if (locale == "uk_UA") {
        list.push("Невірне ім'я")
        list.push("Невірна версія")
    }
    return list
}

// bolt run

function runDescription() {
    const locale = yargs.locale()
    if (locale == "en_US") {
        return "Run script DEV FEATURE"
    } else if (locale == "ru_RU") {
        return "Запустить скрипт DEV FEATURE"
    } else if (locale == "uk_UA") {
        return "Запустити скрипт DEV FEATURE"
    }
}

// bolt update

function updateDescription() {
    const locale = yargs.locale()
    if (locale == "en_US") {
        return "Update bolt"
    } else if (locale == "ru_RU") {
        return "Обновить bolt"
    } else if (locale == "uk_UA") {
        return "Оновити bolt"
    }
}

function updateLoading() {
    const locale = yargs.locale()
    if (locale == "en_US") {
        return kleur.dim("Updating bolt using ") + kleur.red("NPM")
    } else if (locale == "ru_RU") {
        return kleur.dim("Обновление bolt используя ") + kleur.red("NPM")
    } else if (locale == "uk_UA") {
        return kleur.dim("Оновлення bolt використовуючи ") + kleur.red("NPM")
    }
}

function updateUpdated(lang) {
    if (lang == "en_US") {
        return kleur.dim("After update language resets!")
    } else if (lang == "ru_RU") {
        return kleur.dim("После обновления язык сбрасывается!")
    } else if (lang == "uk_UA") {
        return kleur.dim("Після оновлення мова скидається!")
    }
}

// bolt lang

function langDescription() {
    const locale = yargs.locale()
    if (locale == "en_US") {
        return "Change language"
    } else if (locale == "ru_RU") {
        return "Изменить язык"
    } else if (locale == "uk_UA") {
        return "Змінити мову"
    }
}

function langMessage() {
    const locale = yargs.locale()
    if (locale == "en_US") {
        return "Choose language from list:"
    } else if (locale == "ru_RU") {
        return "Выберите язык из списка:"
    } else if (locale == "uk_UA") {
        return "Виберіть мову зі списку:"
    }
}

function langHint() {
    const locale = yargs.locale()
    if (locale == "en_US") {
        return "- Use arrow keys. Press Enter to select."
    } else if (locale == "ru_RU") {
        return "- Используйте клавиши со стрелками. Нажмите Enter, чтобы выбрать."
    } else if (locale == "uk_UA") {
        return "- Використовуйте клавіші зі стрілками. Натисніть Enter, щоб вибрати."
    }
}

function langEnglish() {
    const locale = yargs.locale()
    if (locale == "en_US") {
        return "English"
    } else if (locale == "ru_RU") {
        return "Английский"
    } else if (locale == "uk_UA") {
        return "Англійська"
    }
}
function langRussian() {
    const locale = yargs.locale()
    if (locale == "en_US") {
        return "Russian"
    } else if (locale == "ru_RU") {
        return "Русский"
    } else if (locale == "uk_UA") {
        return "російська"
    }
}
function langUkrainian() {
    const locale = yargs.locale()
    if (locale == "en_US") {
        return "Ukrainian"
    } else if (locale == "ru_RU") {
        return "Украинская"
    } else if (locale == "uk_UA") {
        return "Українська"
    }
}

function langChanged(lang) {
    let str = `${kleur.green("√")}`
    if (lang == "en_US") {
        str += " Language changed"
    } else if (lang == "ru_RU") {
        str += " Язык изменён"
    } else if (lang == "uk_UA") {
        str += " Мова змінена"
    }
    return str
}

// exports

module.exports = {
    // yargs locales
    command,
    // bolt init
    initDescription,
    initQuestions,
    initValidates,
    // bolt run
    runDescription,
    // bolt update
    updateDescription,
    updateLoading,
    updateUpdated,
    // bolt lang
    langDescription,
    langMessage,
    langHint,
    langEnglish,
    langRussian,
    langUkrainian,
    langChanged
}