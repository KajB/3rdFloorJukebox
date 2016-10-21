import FileSystem from 'fs';

import { Mopidy } from '../mopidy';

export default class Help {
    constructor() {
        this.folder = 'src/commands';

        let promise = Mopidy.when.promise((resolve, reject) => {
            FileSystem.readdir(this.folder, (err, files) => {
                if (err) reject(err);
                else resolve(files);
            });
        });

        promise.then((files) => {
            console.log(files);
        }).catch((error) => {
            console.log(error);
        });

        // Mopidy.when.lift(FileSystem.readdirSync)(this.folder).then((files, err) => {
        //     files.forEach(file => {
        //         console.log('lift', file);
        //     });
        // });
    }

    help() {

    }
}
