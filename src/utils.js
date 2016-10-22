export class InternalCommand {
    constructor(method, file) {
        this.method = method;
        this._residesIn = file;
    }

    get residesIn() {
        return this._residesIn.toLowerCase();
    }

    set residesIn(file){
        this._residesIn = file;
    }

    run(params) {
        return this.method(params);
    }
}
export function getCommands(...commandClasses) {
    let commands = new Map();

    commandClasses.forEach((commandClass) => {
        for (let command of Object.getOwnPropertyNames(Object.getPrototypeOf(commandClass))) {
            let method = commandClass[command];
            if (!(method instanceof Function) || method === commandClass.constructor) {
                continue;
            }

            commands.set(command, new InternalCommand(method, commandClass.constructor.name));
        }
    });

    return commands;
}
export function cyclicStringify(obj) {
    let seen = [];
    return JSON.stringify(obj, function(key, val) {
        if (val != null && typeof val == 'object') {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
        }
        return val;
    });
}
export function cyclicObjectToJson(obj) {
    return JSON.parse(cyclicStringify(obj));
}
export function Enum(a) {
    let i = Object.keys(a).reduce((o,k) => (o[a[k]] = k, o), {});

    return Object.freeze(Object.keys(a).reduce((o,k) => (o[k] = a[k], o), v => i[v]));
}
export function isHex(str) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(str);
}
export function isUrl(str) {
    return new RegExp('@^(https?|ftp)://[^\s/$.?#].[^\s]*$@iS').test(str);
}
