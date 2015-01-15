var _ = require('underscore');
var IO = require('./IO');

var path = require('path');
var appDir = path.dirname(require.main.filename);

module.exports.handle = function handle(project, message) {
	require('properties').parse(appDir + '/slack.properties', {path: true, namespaces: true}, function(error, properties) {
		handleWithProperties(project, message, properties);
	});
};

function handleWithProperties(project, message, properties){
	var listeners = properties.listener;
	_.each(Object.keys(listeners), function(key){
		if (listeners[key].projects.indexOf(project) !== -1) {
			IO.sendSlackMessage(listeners[key].url, message, listeners[key].channel, properties)
				.catch(function(error) {
					console.log('Error: ' + error);
					process.exit(0);
				});
		}
	});
}