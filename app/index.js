import express from 'express';
import path from 'path';

const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    // res.send("Success!");
    res.sendFile(path.join(path.resolve() + '/index.html'));
})

app.listen(port, () => console.log(`Server running, visit http://localhost/${port}`));