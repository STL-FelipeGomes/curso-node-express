import mongoose from 'mongoose';
mongoose.connect(
  'mongodb+srv://alura:<password>@alura.uphjigi.mongodb.net/alura'
);
let db = mongoose.connection;
export default db;
