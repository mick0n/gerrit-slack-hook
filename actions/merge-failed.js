var publisher = require('./../slackpublisher');
var gerritservice = require('./../gerritservice');

module.exports.run = function mergeFailed(args) {
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
	var string = args.project + '-' + args.branch + ': <' + args['change-url'] + '|' + subject + '> failed to merge\n\n' + args.reason;
	return string;
}