const path = require('path');
const { config, engine } = require('express-edge');
const express = require('express');
const mediumGetLatestPosts = require("medium-get-latest-posts")

const app = new express();

app.use(express.static('public'));
app.use(engine);
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/blog', (req, res) => {
    mediumGetLatestPosts.getUserLatestPosts('@santteegt').then((posts) => {
        let tags = ['blockchain', 'ethereum'];
        posts = posts.filter(post => post.tags.some(r => tags.indexOf(r.slug) >= 0));
        res.render('blog', {posts});
    }).catch((err) => {
        console.log(err);
    });
});

app.listen(4000, () => {
    console.log('App listening on port 4000')
});
