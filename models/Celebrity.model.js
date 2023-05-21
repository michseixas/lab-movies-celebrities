//  Add your code here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebritySchema = new Schema (
    {
        name: {type: String, required: true},
        occupation: {type: String},
        catchPhrase: {type: String, required: true}
    }
);
 //hasta aqui definimos un Schema (objeto), esto no 
 //lo tendra en cuenta una BD mientras no sea un modelo.
 //Para que sea un modelo, se hace así:

const Celebrity = mongoose.model("Celebrity", celebritySchema); //como quiero que la base de datos se refiera("Celebrities"), y como quiero que sea el schema("celebritySchema").
// aqui le estoy diciendo que cada objeto de esta colección se llamará Celebrity, y el proprio MongoDB lo transforma en una colección de Celebrities.module(en plural)


module.exports = Celebrity; 