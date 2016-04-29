// Dependencies goes here
var express = require('express');
var morgan = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
// var dotenv = require('dotenv'); 
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://jobcenter.id%40gmail.com:AptusPac14@smtp.gmail.com');

// dotenv.load(); //load environment variables from .env into ENV (process.env).

// Sendgrind authentication
// var sendgrid_username = process.env.fargobie;
// var sendgrid_password = process.env.AptusPac14;

// var sendgrid   = require('sendgrid')(sendgrid_username, sendgrid_password);
// var email      = new sendgrid.Email();

var app = express();

// Middleware for use in express
app.use(express.static(__dirname + '/app'));
app.use(morgan('dev'));
app.use(bodyParser.json()); //needed for req.body
// app.use(bodyParser.urlencoded({ extended: true }));


// // Routes goes here - to remove into /routes folder later
// app.get('*', function(req, res) {
//     res.redirect('/#' + req.originalUrl);
// });

app.post('/email', function(req, res) {
    
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"JobCenter.id" <jobcenter.id@gmail.com>', // sender address
        to: 'fargobie@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello from JobCenter.id', // plaintext body
        html: '<b>Hello world 🐴</b><br><p>This is an automated email sent from nodemailer</p>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
});


// express server - change port to whatever as needed
app.listen(process.env.PORT, function(err){
    if (err) throw err;
    console.log("Server is running at port: " + process.env.PORT + " and IP: " + process.env.IP );
    
});
