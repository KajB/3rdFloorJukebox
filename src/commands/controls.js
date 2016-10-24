import { When as when } from '../mopidy';
import { Response } from '../slack';
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
        return when(new Response(200, 'Not yet implemented. Sorry!'));
    }

    /**
     * pause stuff
     */
    pause() {
        return when(new Response(200, 'Not yet implemented. Sorry!'));
    }

    //
    mute() {
        return when(new Response(200, 'Not yet implemented. Sorry!'));
    }

    volume() {
        return when(new Response(200, 'Not yet implemented. Sorry!'));
    }
}

export { VolumeType };
export default Controls;
