import Mopidy from 'mopidy';

import Config from '../config';
import Commands from '../commands';

import Response from './response';
import FormattedResponse from './formatted-response';

class SlashCommand {
    constructor(data) {
        this.token = data.token;
        this.teamId = data.team_id;
        this.teamDomain = data.team_domain;
        this.channelId = data.channel_id;
        this.channelName = data.channel_name;
        this.userId = data.user_id;
        this.userName = data.user_name;
        this.slackCommand = data.command;
        this.text = data.text;
        this.responseUrl = data.response_url;

        this.command = this.text.split(' ')[0];
        this.commandParameters = this.text.split(' ').slice(1);
    }


    getResult() {
        if (this.isInvalid()) {
            return Mopidy.when(new Response(400));
        }

        if (!Commands.has(this.command)) {
            return Mopidy.when(new Response(200, 'The command is not known or currently implemented.'));
        }

        let command = Commands.get(this.command);
        return command(this.commandParameters)
            .then((commandResult) => {
                return new FormattedResponse(commandResult);
            })
            .catch((errorResult) => {
                return new Response(400, errorResult);
            });
    }

    /// When your server receives the above data,
    /// you should validate whether to service the request by confirming that the token value matches
    /// the validation token you received from Slack when creating the command.
    /// If the token or team are unknown to your application, you should refuse to service the request and return an error instead.
    isInvalid() {
        return !this.token || this.token !== Config.SLACK_TOKEN || !this.slackCommand || this.slackCommand !== Config.SLACK_COMMAND;
    }
}

export default SlashCommand;
