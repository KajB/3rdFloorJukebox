import { getCommands } from '../utils';

import Controls from './controls';
import Help from './help';

export default getCommands(new Controls(), new Help());
