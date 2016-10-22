import isTimestamp from 'validate.io-timestamp';

import { isHex, isUrl } from '../utils';

export default class Attachment {
    constructor() {
        this.color = '#000000';
    }

    color(color) {
        if (!color || !isHex(color) || !this.isSlackAttachmentColor(color)) {
            console.warn(`Invalid color, ${color}, for Slack attachment. Setting default color`);
            color = '#000000';
        }

        this.color = color;

        return this;
    }

    author(author) {
        if (author.name && author.link) {
            if (!isUrl(author.link)) {
                console.warn(`Invalid author url, ${author.link}, for Slack attachment. Resetting...`);
                author.link = undefined;
            }
        }

        if (author.name && author.icon) {
            if (!isUrl(author.icon) || !this.isCorrectSlackImageFormat(author.icon)) {
                console.warn(`Invalid author icon url, ${author.icon}, for Slack attachment. Resetting...`);
                author.icon = undefined;
            }
        }

        this.author_name = author.name;
        this.author_link = author.link;
        this.author_icon = author.icon;

        return this;
    }

    pretext(pretext, markdown = { use: false }) {
        if (markdown.use && markdown.type) {
            pretext = ''.concat(markdown.type, pretext, markdown.type);

            if (!this.mrkdwn_in) {
                this.mrkdwn_in = [];
            }

            this.mrkdwn_in.push(this.pretext.name);
        }

        this.pretext = pretext;
        return this;
    }

    title(title) {
        if (title.name && title.link) {
            if (!isUrl(title.link)) {
                console.warn(`Invalid title url, ${title.link}, for Slack attachment. Resetting...`);
                title.link = undefined;
            }
        }

        this.title = title.name;
        this.title_link = title.link;

        return this;
    }

    text(text) {
        this.text = text;
        return this;
    }

    image(url) {
        if (!url || !isUrl(url) || !this.isCorrectSlackImageFormat(url)) {
            console.warn(`Invalid image url, ${url}, for Slack attachment. Resetting...`);
            url = undefined;
        }

        this.image_url = url;

        return this;
    }

    thumbnail(url) {
        if (!url || !isUrl(url) || !this.isCorrectSlackImageFormat(url)) {
            console.warn(`Invalid thumbnail url, ${url}, for Slack attachment. Resetting...`);
            url = undefined;
        }

        this.thumb_url = url;

        return this;
    }

    field(field, markdown = { use: false }) {
        if (!this.fields) {
            this.fields = [];
        }

        if (markdown.use && markdown.type) {
            field.value = ''.concat(markdown.type, field.value, markdown.type);

            if (!this.mrkdwn_in) {
                this.mrkdwn_in = [];
            }

            this.mrkdwn_in.push('fields');
        }

        this.fields.push(field);

        return this;
    }

    flds(fields, markdown = { use: false }) {
        fields.forEach((field) => {
            this.field(field, markdown);
        });

        return this;
    }

    footer(footer) {
        if (footer.text && !footer.icon || !isUrl(footer.icon) || !this.isCorrectSlackImageFormat(footer.icon)) {
            console.warn(`Invalid footer icon url, ${footer.icon}, for Slack attachment. Resetting...`);
            footer.icon = undefined;
        }

        if (!footer.ts || !isTimestamp(footer.ts)) {
            console.warn(`Invalid footer timestamp, ${footer.ts}, for Slack attachment. Resetting...`);
            footer.ts = undefined;
        }

        this.footer = footer.text;
        this.footer_icon = footer.icon;
        this.ts = footer.ts;

        return this;
    }

    fallback(fallback) {
        this.fallback = fallback;
        return this;
    }

    isSlackAttachmentColor(color) {
        return ['good', 'warning', 'danger'].some(slackColorKeyword => slackColorKeyword === color.toLowerCase());
    }

    isCorrectSlackImageFormat(url) {
        return ['gif', 'jpeg', 'png', 'bmp'].some(slackImageFormat => slackImageFormat === url.split('.').pop());
    }
}
