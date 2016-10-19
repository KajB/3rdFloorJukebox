import { isHex, isUrl } from '../utils';
import isTimestamp from 'validate.io-timestamp';

export default class Attachment {
    color(color) {
        if (!color || !isHex(color) || !this.isSlackAttachmentColor(color)) {
            console.warn(`Invalid color, ${color}, for Slack attachment. Setting default color`);
            color = '#000000';
        }

        this.color = color;

        return this;
    }

    author(author) {
        if (author.name && !author.link || !isUrl(author.link)) {
            console.warn(`Invalid author url, ${author.link}, for Slack attachment. Resetting...`);
            author.link = undefined;
        }

        if (author.name && !author.icon || !isUrl(author.icon) || !this.isCorrectSlackImageFormat(author.icon)) {
            console.warn(`Invalid author icon url, ${author.icon}, for Slack attachment. Resetting...`);
            author.icon = undefined;
        }

        this.author_name = author.name;
        this.author_link = author.link;
        this.author_icon = author.icon;

        return this;
    }

    pretext(pretext) {
        this.pretext = pretext;
        return this;
    }

    title(title) {
        if (title.name && !title.link || !isUrl(title.link)) {
            console.warn(`Invalid title url, ${title.link}, for Slack attachment. Resetting...`);
            title.link = undefined;
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

    field(field) {
        if (!this.fields) {
            this.fields = [];
        }

        this.fields.push(field);

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
