var publisher = require('./../slackpublisher');
var gerritservice = require('./../gerritservice');

module.exports.run = function commentAdded(args) {
	if(args['is-draft'] == 'true'){
		return;
	}
	gerritservice.getCommitMessageREST(args.change)
		.then(function(subject) {
			publisher.publish(args.project, getString(args, subject));
		})
		.catch(function(error) {
			console.log(error);
			process.exit(0);
		});
};

function getString(args, subject) {
	var string = args.project + '-' + args.branch + ': ' + args.author + ' reviewed <' + args['change-url'] + '|' + subject + '>:\n' + args.comment;
	return string;
}
