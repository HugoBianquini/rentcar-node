import express from 'express';

const app = express()

app.get("/")

app.listen(3333, () => console.log("Server is running"))