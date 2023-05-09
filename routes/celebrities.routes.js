// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/celebrities/create", (req, res, next) => {
  res.render("./celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  console.log("req body pls", req.body);
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((response) => {
      console.log("response create celebirty", response);

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
    .then((results) => {
        const celebrityResults = {results} //transformo el array results en un objeto

        console.log("resultado busqueda" , celebrityResults)
        return celebrityResults //sin el return no plasma el resultado en la pagina celebrities
    })
    .then(results => { // el render tiene que ir dentro de un then, si no no funciona
        res.render("celebrities/celebrities", results);
    })

    .catch(err => next(err)) // If there's an error, catch it

  
});

module.exports = router;
