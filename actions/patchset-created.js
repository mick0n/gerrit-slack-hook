var publisher = require('./../slackpublisher');
var gerritservice = require('./../gerritservice');

module.exports.run = function patchsetCreated(args) {
	if(args['is-draft'] == 'true'){
		return;
	}
	gerritservice.getCommitMessageSSH(args.change)
		.then(function(subject) {
			publisher.publish(args.project, getString(args, subject));
		})
		.catch(function(error) {
			console.log(error);
			process.exit(0);
		});
};

function getString(args, subject) {
	var string = args.project + '-' + args.branch + ': ' + args.uploader;
	if(args.patchset == 1){
		string += ' just committed <' + args['change-url'] + '|' + subject + '>';
	} else {
		string += ' uploaded a new patchset for <' + args['change-url'] + '|' + subject + '>';
	}
	return string;
}
