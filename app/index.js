import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

let urlencoded = bodyParser.urlencoded({ urlencoded: false });

const __dirname = path.resolve();
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(urlencoded);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, () => console.log(`Server running, visit http://localhost/${port}`));