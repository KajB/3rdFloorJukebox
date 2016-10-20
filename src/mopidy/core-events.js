import { Enum }  from '../utils';
import EventNamePrefixes from './eventname-prefixes';

export default Enum({
    MUTECHANGED: `${EventNamePrefixes.EVENT}muteChanged`,
    OPTIONSCHANGED: `${EventNamePrefixes.EVENT}optionsChanged`,
    PLAYBACKSTATECHANGED: `${EventNamePrefixes.EVENT}playbackStateChanged`,
    PLAYLISTCHANGED: `${EventNamePrefixes.EVENT}playlistChanged`,
    PLAYLISTDELETED: `${EventNamePrefixes.EVENT}playlistDeleted`,
    PLAYLISTSLOADED: `${EventNamePrefixes.EVENT}playlistsLoaded`,
    SEEKED: `${EventNamePrefixes.EVENT}seeked`,
    STREAMTITLECHANGED: `${EventNamePrefixes.EVENT}streamTitleChanged`,
    TRACKPLAYBACKENDED: `${EventNamePrefixes.EVENT}trackPlaybackEnded`,
    TRACKPLAYBACKPAUSED: `${EventNamePrefixes.EVENT}trackPlaybackPaused`,
    TRACKPLAYBACKRESUMED: `${EventNamePrefixes.EVENT}trackPlaybackResumed`,
    TRACKPLAYBACKSTARTED: `${EventNamePrefixes.EVENT}trackPlaybackStarted`,
    TRACKLISTCHANGED: `${EventNamePrefixes.EVENT}tracklistChanged`,
    VOLUMECHANGED: `${EventNamePrefixes.EVENT}volumeChanged`
});
