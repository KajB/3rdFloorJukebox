class Response {
    constructor(statuscode, message) {
        return {
            status: statuscode,
            data: message
        };
    }
}

export default Response;
