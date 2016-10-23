import Mopidy from 'mopidy';

import Config from '../config';
import IncomingWebhook from '../slack';
import CallingConvention from './calling-convention';

class MopidyHandler {
    constructor() {
        this._mopidy = new Mopidy({ webSocketUrl: `ws://${Config.MOPIDY_HOSTNAME}:${Config.MOPIDY_PORT}/mopidy/ws/`,
                                    autoConnect: false,
                                    callingConvention: CallingConvention.POSITION_OR_NAME,
                                    backoffDelayMin: 5000,
                                    backoffDelayMax: 320000 });

        this._mopidy.on(console.log.bind(console, 'INTERNAL LOGGING:'));
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

export default new MopidyHandler();
