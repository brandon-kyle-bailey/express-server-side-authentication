// imports
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import ExpressValidator from 'express-validator';
import mongoose from 'mongoose';
import { encode, decode } from './utils/encoder.js';

import User from './models/user.js';

import { USER, PASSWD, DBURL, PORT, SILENTWARNINGS } from './config.js';

// make database connection
mongoose.connect(DBURL, SILENTWARNINGS);
const db = mongoose.connection;
db.on('error', (error) => console.log(`Internal server error: ${error}`));
db.once('open', () => console.log('Connected to database'));

// set up some constant variables
const __dirname = path.resolve();
const port = process.env.PORT || 8080;

// initialize express to app
const app = express();

// add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ urlencoded: false, extended: true }));
app.use(express.static(__dirname + '/public'));

// set up routes

// get request for home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// post request for form submission
app.post('/submit/user', [
    ExpressValidator.check('name', 'Name is not valid.')
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage('Name must be at least three characters.'),

    ExpressValidator.check('email', 'Email is not valid.')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Email must be a valid email address.'),

    ExpressValidator.check('password', 'Password is not valid.')
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage('Password must be at least five characters.'),

    ExpressValidator.check('postcode', 'Post code is not valid.')
    .not()
    .isEmpty()
    .isAlphanumeric()
    .isPostalCode('GB')
    .withMessage('Post code must be a UK postal code.')

], async(req, res) => {
    const errors = ExpressValidator.validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encode(req.body.password),
        postcode: req.body.postcode
    });
    await user.save()
        .then((newUser) => {
            if (newUser) res.status(202).json(newUser);
        })
        .catch((err) => res.status(400).json({ message: err.message }));
});


// run server
app.listen(port, () => {
    console.log(`Server running, visit http://localhost/${port}`)
});