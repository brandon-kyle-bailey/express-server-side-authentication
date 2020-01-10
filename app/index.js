import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import ExpressValidator from 'express-validator';

let urlencoded = bodyParser.urlencoded({ urlencoded: false, extended: true });

const __dirname = path.resolve();
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(urlencoded);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/submit', [
    ExpressValidator.check('name').not().isEmpty(),
    ExpressValidator.check('email').not().isEmpty()
], (req, res) => {
    const errors = ExpressValidator.validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    res.status(202).json({ success: 'Ok' });
});

app.listen(port, () => console.log(`Server running, visit http://localhost/${port}`));