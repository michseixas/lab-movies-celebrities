//  Add your code here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema (
    {
        title: {type: String, required: true},
        genre: {type: String},
        plot: {type: String},
        cast: [{type: Schema.Types.ObjectId, ref: 'Celebrity'}] //Array of object IDs referencing the Celebrity model (basically, the array of celebrities' IDs)
    }
);
 //hasta aqui definimos un Schema (objeto), esto no 
 //lo tendra en cuenta una BD mientras no sea un modelo.
 //Para que sea un modelo, se hace así:

const Movie = mongoose.model("Movie", movieSchema); //como quiero que la base de datos se refiera("Celebrities"), y como quiero que sea el schema("celebritySchema").

module.exports = Movie; 