import Request from 'request';

import Config from '../config';
import { When as when } from '../mopidy';

class Message  {
    constructor(text) {
        return {
            text: text
        };
    }
}

class FormattedMessage extends Message  {
    constructor(text, channel = undefined, username = undefined, emoji = undefined, attachments = []) {
        let s = super(text);
        return Object.assign(s, {
            channel: channel,
            username: username,
            icon_emoji: emoji,
            attachments: attachments
        });
    }
}

class OverrideOptions {
    constructor(channel, username, icon, toUser = false) {
        this.channelOverride = toUser === true ?  ''.concat('@', channel) : ''.concat('#', channel);
        this.asUser = username;
        this.icon = icon;
    }
}

class IncomingWebhook {
    constructor(overrideOptions) {
        if (overrideOptions.channelOverride) {
            this.channel = overrideOptions.toUser ? ''.concat('@', overrideOptions.channelOverride) : ''.concat('#', overrideOptions.channelOverride);
        }

        if (overrideOptions.asUser) {
            this.username = overrideOptions.asUser;
        }

        if (overrideOptions.icon) {
            if (overrideOptions.icon.startsWith(':') && overrideOptions.icon.endsWith(':')) {
                this.icon_emoji = overrideOptions.icon;
            } else {
                this.icon_url = overrideOptions.icon;
            }
        }
    }

    send(message) {
        if (!(message instanceof Message)) {
            console.error('Cannot send message if its not a incoming webhook message!');
            return;
        }

        when.promise((resolve, reject) => {
            Request({
                uri: Config.SLACK_WEBHOOK_URL,
                method: 'POST',
                json: true,
                body: Object.assign(message, this)
            }, (err, http, res) => {
                if (!err) resolve(res);
                else reject(err);
            });
        })
        .done(
            (success) => {

            },
            (failure) => {

            }
        );
    }
}

export { Message, FormattedMessage, OverrideOptions };
export default IncomingWebhook;
