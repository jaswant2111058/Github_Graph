require("dotenv").config()
const express = require("express");
const app = express();


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set("view engine", "ejs");


const indexRouter = require('./routes/indexRoute');
const homeRouter = require('./routes/homeRoute');


app.use('/', homeRouter);
app.use('/', indexRouter);



app.listen(process.env.PORT || '5000', () => {
    console.log(`Server started at port ${process.env.PORT || '5000'}`);
});