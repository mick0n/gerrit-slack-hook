var service = require('./../actionservice');
var IO = require('./../IO');

module.exports.run = function commentAdded(args) {
	if(args['is-draft'] == 'true'){
		return;
	}
	IO.getCommitMessage(args.change)
		.then(function(subject) {
			service.handle(args.project, getString(args, subject));
		})
		.catch(function(error) {
			console.log(error);
			process.exit(0);
		});
};

function getString(args, subject) {
	var string = args.project + '-' + args.branch + ': ' + args.author;
	if (args['Code-Review']) {
		string = string + ' gave a score of ' + args['Code-Review'] + ' and';
	}
	string = string + ' reviewed <' + args['change-url'] + '|' + subject + '>';
	return string;
}
