// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

//ROUTE CREATE CELEBRITY

router.get("/celebrities/create", (req, res, next) => { //HERE YOU GET THE FORM
  res.render("./celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  console.log("req body pls", req.body); // este console.log solo me muestra lo que hay en el body, que es lo que se cargó en el formulario
  const { name, occupation, catchPhrase } = req.body; //destructuring según ES6

  Celebrity.create({ name, occupation, catchPhrase }) //CREATE A NEW CELEBRITY
    .then((response) => {
      console.log("response create celebirty", response); // este console.log me muestra la respuesta ya desde la base de datos con todo y su ID

      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log(err);

      res.render("celebrities/new-celebrity.hbs");
    });
  res.render("celebrities/new-celebrity");
});

router.get("/celebrities", (req, res, next) => {
    Celebrity.find() //Used find() method on the Celebrity model to retrieve all the celebrities
    .then((results) => { // el render tiene que ir dentro de un then, si no no funciona
        res.render("celebrities/celebrities", {results}); //transformo el array results en un objeto
    })

    .catch(err => next(err)) // If there's an error, catch it

  
});

module.exports = router;
