require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const articleRouter = require("./routes/articles");


mongoose.set('strictQuery', false);
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(process.env.PORT);
        console.log('[+] Connected to the database');
    })
    .catch(err => console.log(err));;


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    const articles = [
        {
            title: "Title 1",
            createdAt: new Date(),
            description: "Description 1"
        },
        {
            title: "Title 2",
            createdAt: new Date(),
            description: "Description 2"
        }
    ];
    
    res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(5000);
