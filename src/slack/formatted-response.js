import Response from './response';
import ResponseType from './response-type';

console.log(String(ResponseType.EPHEMERAL));

class FormattedResponse extends Response {
    constructor(text, attachments, type = ResponseType.EPHEMERAL) {
        super(200, {
            text: text,
            attachments: attachments //TODO: check if attachment is of type attachment etc. etc.
        });
    }
}

export default FormattedResponse;
