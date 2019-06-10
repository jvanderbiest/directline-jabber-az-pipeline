# directline-jabber-az-pipeline
Azure release task that enables you to trigger the directline-jabber testing tool in a an Azure release pipeline

Created using https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops

After restoring node modules, there has been a slight manual modification on directline-jabber npm package because the tasks does not work with the chatdown npm package.
The chatdown reference has been removed from the directline-jabber package in the out folder (transcriptGenerator.js) to make it work.

[[screenshots/screen1.jpg|alt=DirectlineJabberPipeline]]