import { getCommands } from '../utils';

import Controls from './controls';
import Help from './help';

let commands = getCommands(new Controls());
let helpCommands = getCommands(new Help(commands));

export default new Map([...commands, ...helpCommands]);
