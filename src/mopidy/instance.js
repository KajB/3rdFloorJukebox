import Mopidy from 'mopidy';

import Config from '../config';
import CallingConvention from './calling-convention';

export default new Mopidy({ webSocketUrl: `ws://${Config.MOPIDY_HOSTNAME}:${Config.MOPIDY_PORT}/mopidy/ws/`, autoConnect: false, callingConvention: CallingConvention.POSITION_OR_NAME });
