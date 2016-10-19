import Response from './response';
import ResponseType from './response-type';

import Attachment from './attachment';

export default class FormattedResponse extends Response {
    constructor(text, attachments = [], type = ResponseType.EPHEMERAL) {
        if (!attachments.every(attachment => attachment instanceof Attachment)) {
            console.warn(`Not all attachments are of type Attachment. Reverting to empty attachment array...`);
            attachments = [];
        }

        super(200, {
            response_type: type,
            text: text,
            attachments: attachments
        });
    }
}
