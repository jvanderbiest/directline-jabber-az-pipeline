import tl = require('azure-pipelines-task-lib/task');
import { Processor, ActivityHandler, TranscriptGenerator, RequestHandler } from 'directline-jabber';

async function run() {
    try {
        let useDirectlineSecret = false;
        let useTokenEndpoint = false;
        let authValue: string;

        let authenticationSelection: string = tl.getInput('authentication');

        tl.debug("authenticationSelection === " + authenticationSelection);

        if (authenticationSelection === 'directlineSecret') {
            tl.debug("using directlineSecret");

            authValue = tl.getInput('directlineSecretValue');
            useDirectlineSecret = true;
        }
        else if (authenticationSelection === 'token') {
            tl.debug("using token");

            authValue = tl.getInput('tokenValue');
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
        
        // var folderPaths = new Array<string>();
        // folderPaths.push(folderPath);

        // var processor = new Processor(new ActivityHandler(requestHandler), new TranscriptGenerator());
        // await processor.start(null, folderPaths, includeSubfolders);

        tl.setResult(tl.TaskResult.Succeeded, 'Finished directline-jabber-task');
        // console.log('Finished directline-jabber-task');
    }
    catch (err) {
        tl.debug('error: ' + err);
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();