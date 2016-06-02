// Dependencies goes here
require('newrelic');
var express = require('express');
var morgan = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');

// Nodemailer
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport('smtps://jobcenter.id%40gmail.com:AptusPac14@smtp.gmail.com');

var app = express();

// Middleware for use in express
app.use(express.static(__dirname + '/app'));
app.use(morgan('dev'));
app.use(bodyParser.json()); //needed for req.body
app.use(bodyParser.urlencoded({
    extended: true
}));

// // Mailgun details
// var Mailgun = require('mailgun-js');
// var api_key = 'pubkey-05685053792b24137cca1724178974b0';
// var domain = 'jobcenter.id'
// var from_who = 'jobcenter.id@gmail.com'


// Routes goes here - to remove into /routes folder later
app.get('*', function(req, res) {
    res.redirect('/#' + req.originalUrl);
});

// contact us route using nodemailer
app.post('/contact', function(req, res) {
    
    // var name = req.body.name;
    // var from = req.body.email;
    // var subject = req.body.subject;
    // var location = req.body.location;
    // var message = req.body.message;
    // var to = 'audiae@gmail.com';
    
    var data = req.body;
    
    //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
    var smtpTrans = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: "audiae@gmail.com",
            pass: "rskwzfomitkgjljz"
        }
    });
    
    //Mail options
    var mailOpts = {
        from: data.from,
        to: 'audiae@gmail.com',
        subject: '[' + data.location + ']' + data.subject,
        text: 'Alo Alo Bangdung ' + data.message
    };

    smtpTrans.sendMail(mailOpts, function(error, response) {
        //Email not sent
        if (error) {
            console.log(error);
        }
        //Yay!! Email sent
        else {
            console.log('Message sent: ' + response);
        }
    });
});

// express server - change port to whatever as needed
app.listen(8080, function(err) {
    if (err) throw err;
    console.log("Server is running at port: " + process.env.PORT + " and IP: " + process.env.IP);

});
