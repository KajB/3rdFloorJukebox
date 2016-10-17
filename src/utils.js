export function getCommands(...commandClasses) {
    let commands = new Map();

    commandClasses.forEach((commandClass) => {
        for (let command of Object.getOwnPropertyNames(Object.getPrototypeOf(commandClass))) {
            let method = commandClass[command];
            if (!(method instanceof Function) || method === commandClass.constructor) {
                continue;
            }

            commands.set(command, method);
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
