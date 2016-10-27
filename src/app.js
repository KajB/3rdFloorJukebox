import Express from 'express';
import BodyParser from 'body-parser';

import { MopidyController, Mopidy, Events as MopidyEvents } from './mopidy';
import { SlashCommand } from './slack';
import { cyclicObjectToJson } from './utils';

let app = Express();
let router = Express.Router();

/**
 * Express Router configuration
 */
router.use((req, res, next) => {
    console.log(`A ${req.method} request!!`);
    next();
});

router.route('/')
    .get((req, res) => {
        res.json({ message: 'GET is OK!', mopidy: cyclicObjectToJson(Mopidy) });
    })
    .post((req, res) => {
        let slashCommand = new SlashCommand(req.body);

        let commandPromise = slashCommand.getResult();

        commandPromise.done(
                        (commandResult) => {
                            res.status(commandResult.status).json(commandResult.data);
                        },
                        (errorResult) => {
                            res.status(400).json(errorResult);
                        });
    });

/**
 * Express configuration
 */
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use('/api', router);

app.listen(process.env.port || 3030, () => {
    console.log('ready to serve!');

    //Mopidy.connect();
});

/**
 * Mopidy event configuration
 */
Mopidy.bind({
    [MopidyEvents.ONLINE]: MopidyController.online,
    [MopidyEvents.OFFLINE]: MopidyController.offline,
    [MopidyEvents.RECONNECTION_PENDING]: MopidyController.reconnectionPending,
    [MopidyEvents.RECONNECTING]: MopidyController.reconnecting,

    [MopidyEvents.TRACKPLAYBACKSTARTED]: MopidyController.trackPlaybackStarted
});
