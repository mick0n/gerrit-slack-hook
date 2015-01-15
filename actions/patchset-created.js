var service = require('./../actionservice');
var IO = require('./../IO');

module.exports.run = function patchsetCreated(args) {
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
	var string = args.project + '-' + args.branch + ': ' + args.uploader;
	if(args.patchset == 1){
		string += ' just committed <' + args['change-url'] + '|' + subject + '>';
	} else {
		string += ' uploaded a new patchset for <' + args['change-url'] + '|' + subject + '>';
	}
	return string;
}
