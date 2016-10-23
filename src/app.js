import Express from 'express';
import BodyParser from 'body-parser';

import { SlashCommand } from './slack';
import { MopidyHandler, Events } from './mopidy';
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
        res.json({ message: 'GET is OK!', mopidy: cyclicObjectToJson(MopidyHandler._mopidy) });
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

    //MopidyHandler._mopidy.connect();
});

/**
 * Mopidy event configuration
 */
MopidyHandler._mopidy.bind({
    [Events.ONLINE]: MopidyHandler.online,
    [Events.OFFLINE]: MopidyHandler.offline,
    [Events.RECONNECTION_PENDING]: MopidyHandler.reconnectionPending,
    [Events.RECONNECTING]: MopidyHandler.reconnecting,

    [Events.TRACKPLAYBACKSTARTED]: MopidyHandler.trackPlaybackStarted
});
