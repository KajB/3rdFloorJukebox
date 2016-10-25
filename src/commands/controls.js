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
     * Play. As simple as that.
     */
    play() {
        return when(new Response(200, 'Not yet implemented. Sorry!'));
    }

    /**
     * Pause? Pause?!?! Yea. Pause that shit.
     */
    pause() {
        return when(new Response(200, 'Not yet implemented. Sorry!'));
    }

    /**
     * Pause? Pause?!?! Yea. Pause that shit.
     */
    mute() {
        return when(new Response(200, 'Not yet implemented. Sorry!'));
    }

    /**
     * Pause? Pause?!?! Yea. Pause that shit...
     */
    volume() {
        return when(new Response(200, 'Not yet implemented. Sorry!'));
    }
}

export { VolumeType };
export default Controls;
