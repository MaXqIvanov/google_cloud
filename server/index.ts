import { Request, Response } from "express";
require('dotenv').config()
const cors = require('cors')
const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes')

app.use(express.static(path.resolve('../client/build')));
app.use(cors())
app.use(express.json({limit: '100mb'}))
app.use(express.urlencoded());
app.use('/api', router)
app.get('/*', (req: Request, res: Response) => {
    res.sendFile(`../client/build/index.html`);
});

app.listen(8000, () => {
    console.log('Application listening on port 8000!');
});