import jscomments from 'js-comments';

export default (function () {
    switch (process.env.NODE_ENV) {
        case 'development':
            return {
                DOCS_PATH: './src/commands/',
                DOCS_EXTENSION: '.js',
                DOCS_PARSER: jscomments,
                SLACK_TOKEN: 'yolo',
                SLACK_COMMAND: '3rdFloorJukebox',
                MOPIDY_HOSTNAME: 'localhost',
                MOPIDY_PORT: 6680
            };
        default:
            return {
                DOCS_PATH: './',
                DOCS_EXTENSION: '.json',
                DOCS_PARSER: JSON,
                SLACK_TOKEN: 'yolo',
                SLACK_COMMAND: '3rdFloorJukebox',
                MOPIDY_HOSTNAME: 'localhost',
                MOPIDY_PORT: 6680
            };
    }
})();
