import Express from 'express';
import BodyParser from 'body-parser';

import { SlashCommand } from './slack';
import { mopidy, ServerEvents, CoreEvents } from './mopidy';
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
        res.json({ message: 'GET is OK!', mopidy: cyclicObjectToJson(mopidy) });
    })
    .post((req, res) => {
        let slashCommand = new SlashCommand(req.body);

        let commandPromise = slashCommand.getResult();

        commandPromise.done((commandResult) => {
            res.status(commandResult.status).json(commandResult.data);
        });
    });

/**
 * Express configuration
 */
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use('/api', router);

app.listen(process.env.port || 3030);

/**
 * Mopidy configuration
 */
let serverEvents = {
    [ServerEvents.ONLINE]: () => {
        console.log('Connection with mopidy server established');
    },
    [ServerEvents.OFFLINE]: () => {
        console.log('Connection with mopidy server was broken');
    },
    [ServerEvents.RECONNECTION_PENDING]: () => {
        console.log('Reconnection with mopidy server is pending...');
    },
    [ServerEvents.RECONNECTING]: () => {
        console.log('Reconnecting with mopidy server...');
    }
};

let coreEvents = {
    [CoreEvents.TRACKPLAYBACKSTARTED]: () => {
        console.log('Connection with mopidy server established');
    }
};

mopidy.bind(serverEvents);
mopidy.bind(coreEvents);
