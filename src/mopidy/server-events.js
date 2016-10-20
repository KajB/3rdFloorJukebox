import { Enum }  from '../utils';
import EventNamePrefixes from './eventname-prefixes';

export default Enum({
    ONLINE: `${EventNamePrefixes.STATE}online`,
    OFFLINE: `${EventNamePrefixes.STATE}offline`,
    RECONNECTION_PENDING: 'reconnectionPending',
    RECONNECTING: 'reconnecting'
});
