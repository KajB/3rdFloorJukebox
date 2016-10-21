import { Mopidy } from '../mopidy';
import { Enum } from '../utils';

const VolumeType = Enum({
    UP: '+',
    DOWN: '-'
});

export default class Controls {
    constructor() {

    }

    /**
     * ## .parser
     *
     * Set a parser that can later be used to parse any given string.
     *
     * ```js
     * strings.parser (name, replacements)
     * ```
     *
     * **Example**
     *
     * ```js
     * {%= docs("example-parser.md") %}
     * ```
     *
     * @param {String} `name`
     * @param {Object|Array} `arr` Object or array of replacement patterns to associate.
     *   @property {String|RegExp} `pattern`
     *   @property {String|Function} `replacement`
     * @return {Strings} to allow chaining
     *   @property {Array} `foo`
     * @api public
     */
    play() {
        return Mopidy.when('Not yet implemented. Sorry!');
    }

    /**
     * asd
     */
    pause() {
        return Mopidy.when('Not yet implemented. Sorry!');
    }

    mute() {
        return Mopidy.when('Not yet implemented. Sorry!');
    }

    volume() {
        return Mopidy.when('Not yet implemented. Sorry!');
    }
}
