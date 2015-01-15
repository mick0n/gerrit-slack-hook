var service = require('./../actionservice');
var IO = require('./../IO');

module.exports.run = function mergeFailed(args) {
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
	var string = args.project + '-' + args.branch + ': <' + args['change-url'] + '|' + subject + '> failed to merge!';
	return string;
}