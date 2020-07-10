const passport = require('passport')
const bcrypt = require('bcrypt')
const userConnection = require('./mysql-config-strings');
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser(function (user, done) {
    console.log("serializedUser: " + JSON.stringify(user)+' USER AT ZERO: '+ user[0].id)
    done(null, user[0].id);
});

passport.deserializeUser(function (id, done) {
    
    userConnection.query('SELECT * FROM user where id = ' + userConnection.escape(id), function (err, user) {
        done(err, user[0])
        console.log("deserializedUser: " + JSON.stringify(user) + ' USER AT ZERO: ')
    })
});

exports.localPassport = passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, done) {
        if (userConnection) {
                console.log("Connected to DB***!!!!!")          
            userConnection.query('SELECT * FROM user where email = ' + userConnection.escape(email), function (err, user, fields) {
                if (err) { return done(err); }
                if (!user[0]) {
                    console.log('Incorrect email')
                    return done(null, false);
                }
                if (user != undefined || user != null) {
                    if (!bcrypt.compareSync(password, user[0].password)) {
                        console.log('Incorrect password.')
                        return done(null, false)
                    }
                } else {
                    console.log("something else")
                    return done(null, false)
                }
                
                console.log('2: '+JSON.stringify(user))
                return done(null, user);
            });
        } else {
            console.log('Wrong connection!')
        }
    }
));

