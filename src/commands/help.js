import fs from 'fs';

import Config from '../config';
import { When as when } from '../mopidy';
import { InternalCommand, randomHex } from '../utils';
import { FormattedResponse, Attachment, Field, MarkdownFormatting } from '../slack';

class Parameter {
    constructor(data) {
        this.type = data.substring(data.lastIndexOf('{') + 1, data.lastIndexOf('}'));
        this.name = data.substring(data.indexOf('`') + 1, data.lastIndexOf('`'));
    }
}

class Return {
    constructor(data) {
        this.type = data.substring(data.lastIndexOf('{') + 1, data.lastIndexOf('}'));
        this.description = (data.substring(data.lastIndexOf('}') + 1)).trim();
    }
}

class Comment {
    constructor(data) {
        this.subheads = data.subheads;
        this.description = data.description ?  data.description : '';
        this.parameters = data.param ? data.param.map((param) => new Parameter(param)) : [];
        this.methodName = data.comment.code.endsWith('{') ? data.comment.code.split('(')[0] : undefined;
        this.return = data.return ? new Return(data.return) : new Return('{void}');
    }
}

class Help {
    constructor() {
        // when.lift(FileSystem.readdirSync)(this.folder).then((files, err) => {
        //     files.forEach(file => {
        //         console.log('lift', file);
        //     });
        // });
    }

    help(commands) {
        let helpPromises = [...commands.values()].filter(command => command.method.name !== 'help' && command.method.name !== 'commandHelp')
                                                 .map(command => commands.get('commandHelp').run(command));

        return when.all(helpPromises).then((formattedResponses) => {
            return formattedResponses.map(formattedResponse => formattedResponse.data.attachments)
                                     .filter(attachments => attachments.length > 0)
                                     .reduce((a, b) => a.concat(b))
                                     .map(attachment => {
                                         return {
                                             commandName: attachment.author_name,
                                             description: attachment.pretext,
                                             fields: [new Field(attachment.author_name, attachment.pretext, false)]
                                         };
                                     })
                                     .reduce((p, c, i, a) => {
                                         p.fields.push(new Field(c.commandName, c.description, false));

                                         if (i === (a.length - 1)) {
                                             return new FormattedResponse(`Global help`, [new Attachment().fields(p.fields, { use: true })
                                                                                                          .color(randomHex())
                                                                                                          .build()]);
                                         }

                                         return p;
                                     });
        });
    }

    commandHelp(command) {
        if (!(command instanceof InternalCommand)) {
            return when.reject('The given command is no instance of the Command class. A named command can only be executed when created as a internal command.');
        }

        const helpFilenamePath = Config.DOCS_PATH + command.residesIn + Config.DOCS_EXTENSION;

        return when.promise((resolve, reject) => {
            fs.readFile(helpFilenamePath, 'utf8', (err, file) => {
                if (!err) resolve(Config.DOCS_PARSER.parse(file));
                else reject(err);
            });
        }).then((commentsData) => {
            let comments = commentsData.map((comment) => new Comment(comment));
            let comment = comments.find((comment) => comment.methodName === command.method.name);

            if (!comment) {
                return new FormattedResponse(`*${command.method.name}* can help itself!`);
            }

            let attachment = new Attachment().title({ name: 'parameters' })
                                             .pretext(comment.description, { use: true, type: MarkdownFormatting.ITALIC })
                                             .author({ name: `/${Config.SLACK_COMMAND} ${comment.methodName} (-h | --help)`})
                                             .fields(comment.parameters.map((parameter) => new Field(parameter.name, parameter.type)))
                                             .build();

            return new FormattedResponse(`Help for command: *${comment.methodName}*`, [attachment]);
        });
    }
}

export default Help;
