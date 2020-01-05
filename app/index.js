import express from 'express';

const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send("Success!");
})

app.listen(port, () => console.log(`Server running, visit http://localhost/${port}`));