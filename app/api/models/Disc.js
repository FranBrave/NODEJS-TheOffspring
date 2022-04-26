//IMPORTAMOS LAS DEPENDENCIAS
import mongoose from "mongoose";

//Recupero Schema de mongoose
const Schema = mongoose.Schema;

//Creamos el esquema para los Helados
const DiscSchema = new Schema({
  title: { type: String, required: true },
  released: { type: String, required: true },
  sales: { type: Number, required: false },
  image: { type: String, required: false },
  songs: [{ type: mongoose.Types.ObjectId, ref: 'Song'}],
},
{timestamps: true,});

const Disc = mongoose.model("Disc", DiscSchema);

export { Disc };