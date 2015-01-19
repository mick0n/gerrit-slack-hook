var _ = require('underscore');
var Reader = require('properties-reader');

var path = require('path');
var appDir = path.dirname(require.main.filename);

var properties = new Reader(appDir + '/slack.properties');
module.exports = properties.path();