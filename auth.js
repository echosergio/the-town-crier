var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

module.exports = function () {
    passport.use(new BasicStrategy(
        function (user, password, done) {
            if (process.env.AUTH_USER == user && process.env.AUTH_PASS == password) {
                return done(null, true);
            }
            return done(null, false);
        }));

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate('basic', {
                session: false
            });
        }
    };
};