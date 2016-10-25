import isTimestamp from 'validate.io-timestamp';

import { Enum, isHex, isUrl } from '../utils';

const MarkdownFormatting = Enum({
    STRIKE: '~',
    BOLD: '*',
    ITALIC: '_',
    CODE: '`',
    PRE: '```'
});

class Field {
    constructor(title, value, short = true) {
        this.title = title;
        this.value = value;
        this.short = short;
    }
}

class Attachment {
    constructor() {
        this._color = '#000000';
    }

    color(color) {
        if (!color || !isHex(color)) {
            if (!this.isSlackAttachmentColor(color)) {
                console.warn(`Invalid color, ${color}, for Slack attachment. Setting default color`);
                color = '#000000';
            }
        }

        this._color = color;

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

        this._author_name = author.name;
        this._author_link = author.link;
        this._author_icon = author.icon;

        return this;
    }

    pretext(pretext, markdown = { use: false }) {
        if (markdown.use) {
            if (markdown.type) {
                pretext = ''.concat(markdown.type, pretext, markdown.type);
            }

            if (!this._mrkdwn_in) {
                this._mrkdwn_in = [];
            }

            if (!this._mrkdwn_in.includes(this.pretext.name)) {
                this._mrkdwn_in.push(this.pretext.name);
            }
        }

        this._pretext = pretext;
        return this;
    }

    title(title) {
        if (title.name && title.link) {
            if (!isUrl(title.link)) {
                console.warn(`Invalid title url, ${title.link}, for Slack attachment. Resetting...`);
                title.link = undefined;
            }
        }

        this._title = title.name;
        this._title_link = title.link;

        return this;
    }

    text(text) {
        this._text = text;
        return this;
    }

    image(url) {
        if (!url || !isUrl(url) || !this.isCorrectSlackImageFormat(url)) {
            console.warn(`Invalid image url, ${url}, for Slack attachment. Resetting...`);
            url = undefined;
        }

        this._image_url = url;

        return this;
    }

    thumbnail(url) {
        if (!url || !isUrl(url) || !this.isCorrectSlackImageFormat(url)) {
            console.warn(`Invalid thumbnail url, ${url}, for Slack attachment. Resetting...`);
            url = undefined;
        }

        this._thumb_url = url;

        return this;
    }

    field(field, markdown = { use: false }) {
        if (!this._fields) {
            this._fields = [];
        }

        if (markdown.use) {
            if (markdown.type) {
                field.value = ''.concat(markdown.type, field.value, markdown.type);
            }

            if (!this._mrkdwn_in) {
                this._mrkdwn_in = [];
            }

            if (!this._mrkdwn_in.includes('fields')) {
                this._mrkdwn_in.push('fields');
            }
        }

        this._fields.push(field);

        return this;
    }

    fields(fields, markdown = { use: false }) {
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

        this._footer = footer.text;
        this._footer_icon = footer.icon;
        this._ts = footer.ts;

        return this;
    }

    fallback(fallback) {
        this._fallback = fallback;
        return this;
    }

    build() {
        return {
            color: this._color ? this._color : undefined,
            fallback: this._fallback ? this._fallback : undefined,
            footer: this._footer ? this._footer : undefined,
            footer_icon: this._footer_icon ? this._footer_icon : undefined,
            ts: this._ts ? this._ts : undefined,
            fields: this._fields ? this._fields : undefined,
            mrkdwn_in: this._mrkdwn_in ? this._mrkdwn_in : undefined,
            thumb_url: this._thumb_url ? this._thumb_url : undefined,
            image_url: this._image_url ? this._image_url : undefined,
            text: this._text ? this._text : undefined,
            title: this._title ? this._title : undefined,
            title_link: this._title_link ? this._title_link : undefined,
            pretext: this._pretext ? this._pretext : undefined,
            author_name: this._author_name ? this._author_name : undefined,
            author_link: this._author_link ? this._author_link : undefined,
            author_icon: this._author_icon ? this._author_icon : undefined
        };
    }

    isSlackAttachmentColor(color) {
        return ['good', 'warning', 'danger'].some(slackColorKeyword => slackColorKeyword === color.toLowerCase());
    }

    isCorrectSlackImageFormat(url) {
        return ['gif', 'jpeg', 'png', 'bmp'].some(slackImageFormat => slackImageFormat === url.split('.').pop());
    }
}

export { Field, MarkdownFormatting };
export default Attachment;
