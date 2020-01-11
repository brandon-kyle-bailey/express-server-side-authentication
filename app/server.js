// imports
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import ExpressValidator from 'express-validator';
import mongoose from 'mongoose';

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
    ExpressValidator.check('name')
    .not()
    .isEmpty()
    .isLength({ min: 3 }),

    ExpressValidator.check('email')
    .not()
    .isEmpty()
    .isEmail()

], async(req, res) => {
    const errors = ExpressValidator.validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email
    });
    await user.save()
        .then((newUser) => {
            if (newUser) res.status(202).json(newUser);
        })
        .catch((err) => res.status(400).json({ message: err.message }));

    // res.status(202).json({ success: 'Ok' });
});


// run server
app.listen(port, () => console.log(`Server running, visit http://localhost/${port}`));