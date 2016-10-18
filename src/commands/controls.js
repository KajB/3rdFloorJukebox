import Mopidy from 'mopidy';

import VolumeType from './volume-type';

export default class Controls {
    constructor() {

    }

    play() {
        return Mopidy.when('It plays!');
    }

    pause() {

    }

    mute() {

    }

    volume() {

    }
}
