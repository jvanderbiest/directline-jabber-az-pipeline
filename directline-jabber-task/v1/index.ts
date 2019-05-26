import tl = require('azure-pipelines-task-lib/task');
import { Processor, ActivityHandler, TranscriptGenerator, RequestHandler } from 'directline-jabber';

async function run() {
    try {
        let useDirectlineSecret = false;
        let useTokenEndpoint = false;
        let authValue: string;

        let authenticationSelection: string = tl.getInput('authentication');

        if (authenticationSelection === 'directlineSecret') {
            authValue = tl.getInput('directlinesecret');
            useDirectlineSecret = true;
        }
        else if (authenticationSelection === 'token') {
            authValue = tl.getInput('token');
            useTokenEndpoint = true;
        }
        else {
            tl.setResult(tl.TaskResult.Failed, 'Authentication was not set.');
            return;            
        }

        const folderPath: string = tl.getInput('folderPath');
        const includeSubfolders: boolean = tl.getBoolInput('includeSubfolders', true);

        var requestHandler;
        if (useDirectlineSecret) {
            requestHandler = new RequestHandler(authValue, '');
        }
        else if (useTokenEndpoint) {
            requestHandler = new RequestHandler('', authValue);
        }
        
        var processor = new Processor(new ActivityHandler(requestHandler), new TranscriptGenerator());
        processor.start(null, folderPath, includeSubfolders);

        console.log('Finished directline-jabber-task');
    }
    catch (err) {
        tl.debug('xcodeMajorVersion = ' + err);
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();