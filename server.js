const express = require('express');
var secure = require('express-force-https');
const cors = require('cors')
const path = require('path')
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser')
const passport = require('passport');

//var cookieParser = require('cookie-parser')
var session = require('express-session')

const app = express()
app.use(secure)
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//app.use(cookieParser());
app.use(bodyParser({ extended: false }))
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

const userRoute = require('./routes/userRoute')
userRoute(app)

if (process.env.NODE_ENV != 'production') {
    app.use(express.static(path.join(__dirname, 'client/public')));
    app.get('/', function (req, res) {
        res.sendFile(__dirname, 'client/public', 'index.html');
    })
    require('dotenv').config();   
};

app.all('*', (req, res) => {
    res.send('<h1>The file does not exist!</h1><h1>The file does not exist!</h1><h1>The file does not exist!</h1><h1>The file does not exist!</h1>');
})

const port = process.env.PORT || 3443;
https.createServer({    
    key: fs.readFileSync('./ssl/ryans-key.pem'),
    cert: fs.readFileSync('./ssl/ryans-cert.pem')
}, app).listen(port, error => { if (error) { throw error; } else { console.log('server running on port ' + port) } });
