export default class Response {
    constructor(statuscode, message) {
        return {
            status: statuscode,
            data: message
        };
    }
}
