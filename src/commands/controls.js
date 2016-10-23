import { Mopidy } from '../mopidy';
import { Enum } from '../utils';

const VolumeType = Enum({
    UP: '+',
    DOWN: '-'
});

class Controls {
    constructor() {

    }

    /**
     * Set a parser that can later be used to parse any given string.
     *
     * @param {String} `name`
     * @param {Boolean} `yolo`
     * @return {Strings} to allow chaining
     */
    play() {
        return Mopidy.when('Not yet implemented. Sorry!');
    }

    /**
     * pause stuff
     */
    pause() {
        return Mopidy.when('Not yet implemented. Sorry!');
    }

    //
    mute() {
        return Mopidy.when('Not yet implemented. Sorry!');
    }

    volume() {
        return Mopidy.when('Not yet implemented. Sorry!');
    }
}

export { VolumeType };
export default Controls;
