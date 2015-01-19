require('es6-promise').polyfill();
var _ = require('underscore');
var needle = require('needle');
var properties = require('./properties');

module.exports.publish = function handle(project, message) {
	var listeners = properties.listener;
	_.each(Object.keys(listeners), function(key){
		if (listeners[key].projects.indexOf(project) !== -1) {
			send(listeners[key].url, message)
				.then(function() {
					console.log('Published message from "' + project + '" to listener "' + key + '" successfully');
				})
				.catch(function(error) {
					console.log('Error in slackpublisher: ' + error);
					process.exit(0);
				});
		}
	});
};

function send(url, text) {
	return new Promise(function(resolve, reject) {
		var data = {
			text: text
		};
		var props = {};
		if(properties.proxy) {
			props.proxy = properties.proxy;
		}
		needle.post(url, JSON.stringify(data), props, function(error) {
			if(error) {
				return reject(error);
			}
			resolve();
		});
	});
}