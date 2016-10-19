import Express from 'express';
import BodyParser from 'body-parser';

import { cyclicObjectToJson } from './utils';
import { SlashCommand } from './slack';

const port = process.env.port || 3030;

let router = Express.Router();

router.use((req, res, next) => {
    console.log(`A ${req.method} request!!`);
    next();
});

router.route('/')
    .get((req, res) => {
        res.json({ message: 'GET is OK!', request: cyclicObjectToJson(req) });
    })
    .post((req, res) => {
        let slashCommand = new SlashCommand(req.body);

        let commandPromise = slashCommand.getResult();

        commandPromise.done((commandResult) => {
            res.status(commandResult.status).json(commandResult.data);
        });
    });

let app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use('/api', router);

app.listen(port);
