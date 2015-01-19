require('es6-promise').polyfill();
var Connection = require('ssh2');
var needle = require('needle');
var properties = require('./properties');

module.exports.getCommitMessageSSH = function getCommitMessageSSH(changeId) {
	return new Promise(function(resolve, reject) {
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
};
