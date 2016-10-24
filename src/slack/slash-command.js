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
            data: typeof message === 'string' || message instanceof String ? { text: message } : message
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

        this.command = this.text ? this.text.split(' ')[0] : null;
        this.commandParameters = this.text ? this.text.split(' ').slice(1) : null;
    }

    getResult() {
        if (this.isInvalid()) {
            return when(new Response(400));
        }

        if (this.criesForHelp()) {
            return Commands.get('help')
                           .run(Commands);
        }

        if (!this.isKnown()) {
            return when(new Response(200, 'That command is not known or currently implemented.'));
        }

        if (this.wantsSpecificHelp()) {
            return Commands.get('commandHelp')
                           .run(Commands.get(this.command));
        }

        return Commands.get(this.command)
                       .run(this.commandParameters);
    }

    isInvalid() {
        return !this.token || this.token !== Config.SLACK_TOKEN || !this.slackCommand || this.slackCommand !== Config.SLACK_COMMAND;
    }

    criesForHelp() {
        return !this.command && !this.commandParameters || this.command === 'help';
    }

    isKnown() {
        return Commands.has(this.command);
    }

    wantsSpecificHelp() {
        return (this.commandParameters.includes('-h') || this.commandParameters.includes('--help'));
    }
}

export { Response, FormattedResponse, ResponseType };
export default SlashCommand;
