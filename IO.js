require('es6-promise').polyfill();
var needle = require('needle');
var Connection = require('ssh2');

module.exports.sendSlackMessage = function send(url, text, channel, properties) {
	return new Promise(function(resolve, reject) {
		var data = {
			text: text,
			channel: channel
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
};

var path = require('path');
var appDir = path.dirname(require.main.filename);

module.exports.getCommitMessage = function getCommitMessage(changeId, properties) {
	return new Promise(function(resolve, reject) {
		require('properties').parse(appDir + '/slack.properties', {path: true, namespaces: true}, function(error, properties) {
			var connection = new Connection();
			connection.on('error', function(error) {
				return reject(error);
			});
			connection.connect({
				host: properties.ssh.host,
				port: properties.ssh.port,
				username: properties.ssh.username,
				privateKey: require('fs').readFileSync(properties.ssh.privateKey)
			});

			connection.on('ready', function(){
				var query = 'gerrit query --format JSON change:' + changeId;
				connection.exec(query, function(error, stream) {
					if(error) {
						return reject(error);
					}
					var data = '';
					stream.on('data', function(chunk) {
						data += chunk;
					});
					stream.on('exit', function(){
						connection.end();
						try{
							resolve(JSON.parse(data.substring(0, data.indexOf('\n'))).subject);
						}catch(error) {
							return reject(error);
						}
					});
				});
			});
		});
	});
};