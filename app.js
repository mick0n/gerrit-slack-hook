var changeMerged = require('./actions/change-merged');
var commentAdded = require('./actions/comment-added');
var draftPublished = require('./actions/draft-published');
var mergeFailed = require('./actions/merge-failed');
var patchsetCreated = require('./actions/patchset-created');

var args = parseArguments(process.argv);
performAction(args);

function performAction(args){
	switch (args.action) {
		case 'change-merged':
			changeMerged.run(args);
			break;
		case 'comment-added':
			commentAdded.run(args);
			break;
		case 'draft-published':
			draftPublished.run(args);
			break;
		case 'merge-failed':
			mergeFailed.run(args);
			break;
		case 'patchset-created':
			patchsetCreated.run(args);
			break;
		default:
			console.log('No such action');
	}
}

function parseArguments(args){
	var options = {};
	for(var i = 0; i < args.length; i++){
		if(args[i].length > 2 && args[i].substring(0, 2) === '--') {
			options[args[i].substring(2, args[i].length)] = args[i + 1];
			i++; //Jump one extra
		}
	}
	return options;
}