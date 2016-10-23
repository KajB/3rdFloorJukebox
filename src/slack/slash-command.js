import Config from '../config';
import Commands from '../commands';
import { When as when } from '../mopidy';
import { Enum }  from '../utils';

const ResponseType = Enum({
    EPHEMERAL: 'ephemeral',
    IN_CHANNEL: 'in_channel'
});

class Response {
    constructor(statuscode, message) {
        return {
            status: statuscode,
            data: message
        };
    }
}

class FormattedResponse extends Response {
    constructor(text, attachments = [], type = ResponseType.EPHEMERAL) {
        super(200, {
            response_type: type,
            text: text,
            attachments: attachments
        });
    }
}

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
            return when(new Response(400));
        }

        if (!Commands.has(this.command)) {
            return when(new Response(200, 'That command is not known or currently implemented.'));
        }

        let command = this.needsHelp() ? Commands.get('help')
                                       : Commands.get(this.command);
        let commandParameters = this.needsHelp() ? Commands.get(this.command)
                                                 : this.commandParameters;

        return command.run(commandParameters);
    }

    isInvalid() {
        return !this.token || this.token !== Config.SLACK_TOKEN || !this.slackCommand || this.slackCommand !== Config.SLACK_COMMAND;
    }

    needsHelp() {
        return (this.commandParameters.includes('-h') || this.commandParameters.includes('--help'));
    }
}

export { Response, FormattedResponse, ResponseType };
export default SlashCommand;
