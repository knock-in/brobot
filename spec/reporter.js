var gutil = require('gulp-util');

var reporter = {
    jasmineStarted: function(suiteInfo) {
        gutil.log('Running suite with', gutil.colors.magenta(suiteInfo.totalSpecsDefined), 'specs');
    },
    suiteStarted: function(result) {
        gutil.log('Suite started:', gutil.colors.cyan(result.description), 'whose full description is:', gutil.colors.cyan(result.fullName));
    },
    specStarted: function(result) {
        gutil.log('Spec started:', gutil.colors.cyan(result.description), 'whose full description is:', gutil.colors.cyan(result.fullName));
    },
    specDone: function(result) {
        gutil.log('Spec:', gutil.colors.cyan(result.description), 'was', gutil.colors.cyan(result.status));
        for(var i = 0; i < result.failedExpectations.length; i++) {
          gutil.log(gutil.colors.red('Failure:'), gutil.colors.cyan(result.failedExpectations[i].message));
        }
    },
    suiteDone: function(result) {
        gutil.log('Suite:', gutil.colors.cyan(result.description), 'was', gutil.colors.cyan(result.status));
        for(var i = 0; i < result.failedExpectations.length; i++) {
          gutil.log(gutil.colors.red('AfterAll'), gutil.colors.cyan(result.failedExpectations[i].message));
        }
    },
    jasmineDone: function() {
        gutil.log('Finished suite');
    }
};

module.exports = reporter;