import Mopidy from 'mopidy';
import MopidyHandler  from './instance';
import CallingConvention from './calling-convention';
import Events, { Prefixes } from './events';

let when = Mopidy.when;

export { Mopidy, when as When, MopidyHandler, CallingConvention, Prefixes, Events };
