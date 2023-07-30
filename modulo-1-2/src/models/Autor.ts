import mongoose from 'mongoose';

const autorSchema: mongoose.Schema = new mongoose.Schema(
  {
    id: { type: String },
    nome: { type: String, required: [true, 'O nome do(a) é obrigatório'] },
    nascionalidade: {
      type: String,
      required: [true, 'A nacionalidade do(a) é obrigatório'],
    },
  },
  {
    versionKey: false,
  }
);

const autores = mongoose.model('autores', autorSchema);

export default autores;
