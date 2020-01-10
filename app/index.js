import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const __dirname = path.resolve();
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, () => console.log(`Server running, visit http://localhost/${port}`));