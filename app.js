var args = parseArguments(process.argv);
performAction(args);

function performAction(args) {
	switch (args.action) {
		case 'change-merged':
			require('./actions/change-merged').run(args);
			break;
		case 'comment-added':
			require('./actions/comment-added').run(args);
			break;
		case 'draft-published':
			require('./actions/draft-published').run(args);
			break;
		case 'merge-failed':
			require('./actions/merge-failed').run(args);
			break;
		case 'patchset-created':
			require('./actions/patchset-created').run(args);
			break;
		default:
			console.log('No such action');
	}
}

function parseArguments(args) {
	var argumentsObject = {};
	var currentKey;
	args.forEach(function(arg) {
		if (arg.length > 2 && arg.substring(0, 2) === '--') {
			var key = arg.substring(2, arg.length);
			argumentsObject[key] = '';
			currentKey = key;
		} else {
			if (currentKey) {
				if (argumentsObject[currentKey]) {
					argumentsObject[currentKey] += ' ';
				}
				argumentsObject[currentKey] += arg;
			}
		}
	});
	return argumentsObject;
}