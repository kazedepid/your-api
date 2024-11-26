function colors(text, color) {
    const colorCodes = {
        reset: "\x1b[0m",
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        bgBlack: "\x1b[40m",
        bgRed: "\x1b[41m",
        bgGreen: "\x1b[42m",
        bgYellow: "\x1b[43m",
        bgBlue: "\x1b[44m",
        bgMagenta: "\x1b[45m",
        bgCyan: "\x1b[46m",
        bgWhite: "\x1b[47m",
    }

    if (color === 'rainbow') {
        const rainbowColors = [
            colorCodes.red,
            colorCodes.yellow,
            colorCodes.green,
            colorCodes.cyan,
            colorCodes.blue,
            colorCodes.magenta,
        ]

        return text.split('').map((char, index) => {
            return `${rainbowColors[index % rainbowColors.length]}${char}${colorCodes.reset}`
        }).join('')
    }

    return `${colorCodes[color] || colorCodes.reset}${text}${colorCodes.reset}`
}
 function formatDateInTimeZone(date, timeZone) {
    const options = {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }

    return new Intl.DateTimeFormat('en-US', options).format(date)
}

function determineFileType(buffer) {
    if (buffer.length < 4) {
        return { mime: 'application/octet-stream', ext: 'bin' }
    }

    const header = buffer.toString('hex', 0, 4)

    switch (header) {
        case '89504e47':
            return { mime: 'image/png', ext: 'png' }
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
            return { mime: 'image/jpeg', ext: 'jpg' }
        case '47494638':
            return { mime: 'image/gif', ext: 'gif' }
        case '25504446':
            return { mime: 'application/pdf', ext: 'pdf' }
        case '504b0304':
            if (buffer.toString('utf8', 30, 50).includes('AndroidManifest.xml')) {
                return { mime: 'application/vnd.android.package-archive', ext: 'apk' }
            }
            return { mime: 'application/zip', ext: 'zip' }
        default:
            return { mime: 'application/octet-stream', ext: 'bin' }
    }
}

export { colors, determineFileType, formatDateInTimeZone }
