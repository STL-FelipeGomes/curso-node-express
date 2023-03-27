import mongoose from 'mongoose';

const autorSchema: mongoose.Schema = new mongoose.Schema(
  {
    id: { type: String },
    nome: { type: String, required: true },
    nascionalidade: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const autores = mongoose.model('autores', autorSchema);

export default autores;
