const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();



app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials("partials_absolute_path")
hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

/* const apiArr=punkAPI
.getBeers()
.then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
.then(app.get('/beers', (req,res) => {
  res.render('beers')
}))
.catch(error => console.log(error));  */

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((beersFromApi) => {
      res.render('beers', { beers: beersFromApi });
    })
    .catch((error) => {
      console.log(error);
    });
});
 



app.get('/random-beer', (req,res) => {
  res.render('random-beer')
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
