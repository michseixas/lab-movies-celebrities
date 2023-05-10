// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");

// all your routes here
router.get("/movies/create", (req, res, next) => { //aqui /movies/create es la ruta que he decidido, he creado yo, para que cuando se acceda a esta ruta, se renderice lo de la siguiente linea de codigo
    res.render("./movies/new-movie");
  });



module.exports = router;