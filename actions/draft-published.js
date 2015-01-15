var service = require('./../actionservice');
var IO = require('./../IO');

module.exports.run = function draftPublished(args) {
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
	var string = args.project + '-' + args.branch + ': ' + args.uploader + ' published draft <' + args['change-url'] + '|' + subject + '>';
	return string;
}