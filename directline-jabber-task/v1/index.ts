import tl = require('azure-pipelines-task-lib/task');
import { Processor, ActivityHandler, TranscriptGenerator, RequestHandler } from 'directline-jabber';

async function run() {
    try {
        let useDirectlineSecret = false;
        let useTokenEndpoint = false;
        let authValue: string;

        let authenticationSelection: string = tl.getInput('authentication');

        if (authenticationSelection === 'directlineSecret') {
            authValue = tl.getInput('directlineSecretValue');
            useDirectlineSecret = true;
        }
        else if (authenticationSelection === 'token') {
            authValue = tl.getInput('tokenValue');
            useTokenEndpoint = true;
        }
        else {
            tl.setResult(tl.TaskResult.Failed, 'Authentication was not set.');
            return;            
        }

        const folderPath: string = tl.getPathInput('folderPath');
        const includeSubfolders: boolean = tl.getBoolInput('includeSubfolders', true);
        
        const userId: string = tl.getInput('userId');
        const userIdPrefix: string = tl.getInput('userIdPrefix');
        const preprocessFilePath: string = tl.getPathInput('preprocessFilePath');

        var requestHandler;
        if (useDirectlineSecret) {
            requestHandler = new RequestHandler(authValue, '');
        }
        else if (useTokenEndpoint) {
            requestHandler = new RequestHandler('', authValue);
        }
        
        var folderPaths = new Array<string>();
        folderPaths.push(folderPath);

        var processor = new Processor(new ActivityHandler(requestHandler), new TranscriptGenerator(userId, userIdPrefix));
        await processor.start(null, folderPaths, includeSubfolders, preprocessFilePath);

        console.log('Finished directline-jabber-task');
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();