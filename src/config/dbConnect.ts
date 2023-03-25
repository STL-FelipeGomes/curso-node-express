import mongoose from 'mongoose';
mongoose.connect(
  'mongodb+srv://alura:alura123@alura.uphjigi.mongodb.net/alura'
);
let db = mongoose.connection;
export default db;
