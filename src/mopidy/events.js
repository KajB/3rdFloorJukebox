import { Enum }  from '../utils';

let Prefixes = Enum({
    STATE: 'state:',
    EVENT: 'event:',
    WEBSOCKET: 'websocket:'
});

export { Prefixes };
export default Enum({
    ONLINE: `${Prefixes.STATE}online`,
    OFFLINE: `${Prefixes.STATE}offline`,
    RECONNECTION_PENDING: 'reconnectionPending',
    RECONNECTING: 'reconnecting',

    MUTECHANGED: `${Prefixes.EVENT}muteChanged`,
    OPTIONSCHANGED: `${Prefixes.EVENT}optionsChanged`,
    PLAYBACKSTATECHANGED: `${Prefixes.EVENT}playbackStateChanged`,
    PLAYLISTCHANGED: `${Prefixes.EVENT}playlistChanged`,
    PLAYLISTDELETED: `${Prefixes.EVENT}playlistDeleted`,
    PLAYLISTSLOADED: `${Prefixes.EVENT}playlistsLoaded`,
    SEEKED: `${Prefixes.EVENT}seeked`,
    STREAMTITLECHANGED: `${Prefixes.EVENT}streamTitleChanged`,
    TRACKPLAYBACKENDED: `${Prefixes.EVENT}trackPlaybackEnded`,
    TRACKPLAYBACKPAUSED: `${Prefixes.EVENT}trackPlaybackPaused`,
    TRACKPLAYBACKRESUMED: `${Prefixes.EVENT}trackPlaybackResumed`,
    TRACKPLAYBACKSTARTED: `${Prefixes.EVENT}trackPlaybackStarted`,
    TRACKLISTCHANGED: `${Prefixes.EVENT}tracklistChanged`,
    VOLUMECHANGED: `${Prefixes.EVENT}volumeChanged`
});
