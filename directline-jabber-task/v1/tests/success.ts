import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput('authentication', 'token');
tmr.setInput('token', 'https://endpoint.com/token');
tmr.setInput('directlineSecret', '12345');
tmr.setInput('folderPath', 'c:\abc');
tmr.setInput('includeSubFolders', 'true');

tmr.run();