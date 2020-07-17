const cors=require('cors')

const whitelist = ['https://localhost:3000', 'https://localhost:3443'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

const userConnection = require('../configs/mysql-config-strings');
const bcrypt = require('bcrypt')
const passport = require('passport')
const myPassport = require('../configs/passport-configs')

require('dotenv').config()
var jwt = require('jsonwebtoken');


module.exports = function (app) {
    
    app.post('/signup', function (req, res) {
        if (userConnection) {
            console.log('connected to a db table - user');
            let email = req.body.email;
            userConnection.query('SELECT * FROM user where email = ' + userConnection.escape(email), function (error, results, fields) {
                if (error) throw new Error(error);
                if (results.length < 1) {
                    let salt = bcrypt.genSaltSync(10)
                    let password = bcrypt.hashSync(req.body.password, salt)
                    let post = {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        admin: false,
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
                                res.send('Registration Successful!');
                            });
                        });
                    } else {
                        res.statusCode = 200;
                        return res.send('Password / email does not match')
                    }
                } else {
                    res.statusCode = 200;
                    return res.send('Such email already exists')
                }
            });
        } else {
            res.statusCode = 200;
            return res.send('Sorry, wrong connection!')
        }
    })
    app.post('/login', cors(corsOptionsDelegate), function (req, res, next) {
        myPassport.localPassport.authenticate('local', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function (err) {
                if (err) {
                    return next(() => {
                        return res.status(401);
                    })
                }
                if (user) {
                    if (user[0].admin === 1) {
                        let token = jwt.sign({
                            data: 'foobar'
                        }, process.env.REACT_APP_TOKEN_ADMIN, { expiresIn: '1000000h' });
                        res.statusCode = 200;
                        return res.send(token);
                    }
                    if (user[0].admin === 0) {
                        let token = jwt.sign({
                            data: 'foobar'
                        }, process.env.REACT_APP_TOKEN_USER, { expiresIn: '1000000h' });
                        res.statusCode = 200;
                        return res.send(token);
                    }
                }
            })
        })(req, res, next)
    });    
    app.get('/logout',cors(), function (req, res) {req.logout()})        
    
}