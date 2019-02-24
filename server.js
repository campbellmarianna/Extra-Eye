if (!process.env.PORT) { require('dotenv').config() }
const express = require('express')
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');

const app = express()

app.engine('hbs', hbs({ defaultLayout: 'main', extname: "hbs" }));
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home', { msg: 'Handlebars and Hacking are Cool!' });
})

const APIKey = process.env.CLARIFAI_API_KEY
// Implement API
const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app_clar = new Clarifai.App({
 apiKey: APIKey
});



//CREATE
app.post('/clarifai', (req,res) => {
    console.log(req.body)
    input_url = req.body.url
    console.log(input_url)
    app_clar.models.predict(Clarifai.GENERAL_MODEL, input_url)
            .then(response => {
              console.log(response.outputs[0].data);
              // res.render('home', { response: response })
            })
            .catch(err => {
              console.log(err);
            });
});

// Train our own model to recognize harmful images
// Passs in new image to our trained model
// Check if new image associated keywords are in list of target words
    // then return alert
// If new image associated words are not in target words return nothing


var port = process.env.PORT || '3000';
app.listen(port, () => {
    console.log('App listening on port 3000!')
});
