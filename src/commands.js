import { controls } from './controls';

let getCommands = (...commandClasses) => {
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
};

export default getCommands(controls);
