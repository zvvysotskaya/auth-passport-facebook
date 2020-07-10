const userConnection = require('../configs/mysql-config-strings');
const bcrypt = require('bcrypt')
const passport = require('passport')
const myPassport = require('../configs/passport-configs')
var jwt = require('jsonwebtoken');

module.exports = function (app) {

    app.post('/signup', function (req, res, next) {
        if (userConnection) {
            console.log('connected to db table - user');
            let email = req.body.email;
            userConnection.query('SELECT * FROM user where email = ' + userConnection.escape(email), function (error, results, fields) {
                if (error) throw new Error('Something went wrong');
                if (results.length < 1) {
                    let salt = bcrypt.genSaltSync(10)
                    let password = bcrypt.hashSync(req.body.password, salt)
                    let post = {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: password
                    }
                    if (req.body.password === req.body.confirmpassword) {
                        userConnection.query('INSERT INTO user SET ?', post, function (error, results, fields) {
                            if (error) throw error;
                            //adding passport
                            passport.authenticate('local')(req, res, () => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json({ success: true, status: 'Registration Successful!' });
                            });
                            res.send(console.log("Success! username: " + req.body.username));
                        });
                    } else {
                        //console.log('password does not match!');
                        return res.send('Password / email does not match')                       
                    }
                } else {                    
                    return res.send('Such email already exists')
                }
            });
        } else {
            return res.send('Sorry, wrong connection!')
        }       
    })
    app.post('/login', function (req, res, next) {
        myPassport.localPassport.authenticate('local', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err => {
                        return res.status(401).send({ err });
                    })
                }
                console.log('/email/: ' + JSON.stringify(user))
                let token = jwt.sign({
                    data: 'foobar'
                }, 'secret', { expiresIn: '1h' });
                console.log("TOKEN: " + token)
                return res.json(token);
            })
        })(req, res, next)
    });
    
}