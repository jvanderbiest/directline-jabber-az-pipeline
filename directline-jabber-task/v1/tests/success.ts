import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput('authentication', 'token');
tmr.setInput('token', 'https://foo/token');
tmr.setInput('folderPath', 'c:\\notexistent');
tmr.setInput('includeSubFolders', 'true');

tmr.run();