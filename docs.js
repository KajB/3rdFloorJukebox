var fs = require('fs');
var util = require('util');
var jscomments = require('js-comments');

var excludedFiles = process.argv;

function read(fp) {
    return fs.readFileSync(__dirname + '/src/commands/' + fp, 'utf8');
}

function withoutExcluded(file) {
    return excludedFiles.indexOf(file) === -1;
}

var files = (fs.readdirSync(__dirname + '/src/commands/')).filter(withoutExcluded);

if (files.length > 0) {
    if (!fs.existsSync('./dist')) {
        fs.mkdirSync('./dist');
    }
}

for (var i = 0; i < files.length; i++) {
    var comments = jscomments.parse(read(files[i]));
    var log_file = fs.createWriteStream(''.concat('./dist/', files[i].split('.')[0], '.json'), { flags : 'w' });

    log_file.write(util.format(comments) + '\n');
}
