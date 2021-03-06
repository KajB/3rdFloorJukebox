import Mopidy from 'mopidy';

import Config from '../config';
import IncomingWebhook from '../slack';
import { Enum }  from '../utils';

const when = Mopidy.when;
const callingConvention = Enum({
    POSITION: 'by-position-only',
    POSITION_OR_NAME: 'by-position-or-by-name'
});
const mopidy = new Mopidy({ webSocketUrl: `ws://${Config.MOPIDY_HOSTNAME}:${Config.MOPIDY_PORT}/mopidy/ws/`,
                            autoConnect: false,
                            callingConvention: callingConvention.POSITION_OR_NAME,
                            backoffDelayMin: 5000,
                            backoffDelayMax: 320000 });

class MopidyController {
    constructor(mopidy) {
        this.mopidy = mopidy;

        this.mopidy.on(console.log.bind(console, 'INTERNAL LOGGING:'));
    }

    /**
     * Server events
     */

    online() {

    }

    offline() {

    }

    reconnectionPending() {

    }

    reconnecting() {

    }

    /**
     * Track events
     */

    trackPlaybackStarted(tracklistTrack) {
        let incomingWebhook = new IncomingWebhook();
        incomingWebhook.send();

    }

    trackPlaybackPaused(track, position) {

    }

    trackPlaybackResumed(track, position) {

    }

    trackPlaybackEnded(track, position) {

    }

    /**
     * Tracklist events
     */

    tracklistChanged() {

    }

    /**
     * Playlist events
     */

    playlistChanged(playlist) {

    }

    playlistsLoaded() {

    }

    /**
     * Playback events
     */

    playbackStateChanged(oldState, newState) {

    }

    seeked(to) {

    }

    muteChanged(mute) {

    }

    volumeChanged(volume) {

    }
}

export { mopidy as Mopidy, when as When, callingConvention as CallingConvention };
export default new MopidyController(mopidy);
