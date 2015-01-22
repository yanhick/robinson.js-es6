var traceur = require('traceur');
traceur.require.makeDefault(function (filename) {
    //don't transpile dependencies
    return filename.indexOf('node_modules') === -1;
});
require('./index');
