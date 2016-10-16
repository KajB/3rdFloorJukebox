import { config as Config } from '../config';
import commands from '../commands';

import { Response } from './response';

class SlashCommand {
    constructor(data) {
        this.token = data.token;
        this.teamId = data.team_id;
        this.teamDomain = data.team_domain;
        this.channelId = data.channel_id;
        this.channelName = data.channel_name;
        this.userId = data.user_id;
        this.userName = data.user_name;
        this.command = data.command;
        this.text = data.text;
        this.responseUrl = data.response_url;
    }

    getResult() {
        if (!this.token ||
            this.token !== Config.SLACK_TOKEN ||
            !this.command ||
            this.command !== Config.SLACK_COMMAND) {
            return new Response(400);
        }
    }
}

export default SlashCommand;
