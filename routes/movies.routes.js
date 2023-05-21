// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies/create", (req, res, next) => { //aqui /movies/create es la ruta que he decidido, he creado yo, para que cuando se acceda a esta ruta, se renderice lo de la siguiente linea de codigo
  Celebrity.find() //Used find() method on the Celebrity model to retrieve all the celebrities
    .then((results) => { // el render tiene que ir dentro de un then, si no no funciona
        res.render("movies/new-movie", {results}); //transformo el array results en un objeto
    })

    .catch(err => next(err)) // If there's an error, catch it  
  });

  router.post("/movies/create", (req, res, next) => {
    console.log("req body pls", req.body); // este console.log solo me muestra lo que hay en el body, que es lo que se cargó en el formulario
    const { title, genre, plot, cast } = req.body; //destructuring según ES6
    let newMovie = {
      title,
      genre,
      plot,
      cast
    };
    console.log("NEWMOVIE OBJECT: ", newMovie);
  
   Movie.create(newMovie) //CREATE A NEW MOVIE
      .then((newMovie) => {
        console.log("response create NEW MOVIE", newMovie); // este console.log me muestra la respuesta ya desde la base de datos con todo y su ID
  
        res.redirect("/movies");
      })
      .catch((err) => {
        console.log(err);
  
        res.render("celebrities/new-celebrity.hbs");
      });
  });

  router.get("/movies", (req, res, next) => {
    Movie.find() //Used find() method on the Movie model to retrieve all the movies
    .then((results) => { 
        res.render("movies/movies", {results}); //transformo el array results en un objeto
    })
    .catch(err => next(err)) // If there's an error, catch it
});

router.get("/movies/:id", (req, res, next) => {
  console.log("esto es el req param id", req.params.id);
  Movie.findOne({_id:req.params.id}) //Used findOne() method to retrieve a specific movie by id
  .populate("cast") //pasar al populate el nombre del atributo que quiero popular, entre colmillas.
  .then((results) => { 
    console.log("estos son results de Populated Movie", results)
      res.render("movies/movie-details", {results}); //transformo el array results en un objeto
  })
  .catch(err => next(err)) // If there's an error, catch it
});

//DELETE A MOVIE
router.post("/movies/:id/delete", (req, res, next) => {
  console.log("Movie to delete---->", req.params.id); // este console.log muestra el id del movie que vamos a borrar

 Movie.findByIdAndRemove(req.params.id) //DELETE A NEW MOVIE
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
    });
});


//EDIT A MOVIE

router.get("/movies/:id/edit", (req, res, next) => {
  console.log("esto es el req param id", req.params.id);

  Movie.findOne({_id:req.params.id}) //Used findOne() method to retrieve a specific movie by id
  .then((movieToEdit) => { 
    console.log("here is the movie to edit", movieToEdit);
    Celebrity.find()
    .then((celebrities) => {
      let movieAndCelebrities = { movieToEdit, celebrities}
      res.render("movies/edit-movie", movieAndCelebrities); //uso la variable creada arriba, que suma Movie con Celebrities
    });
  })
  .catch(err => next(err)) // If there's an error, catch it
});


router.post("/movies/:id", (req, res, next) => {
  console.log("Movie to edit---->", req.body); // este console.log muestra el id del movie que vamos a editar

 Movie.findByIdAndUpdate(req.params.id, req.body) //Update a movie
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
    });
});





module.exports = router;