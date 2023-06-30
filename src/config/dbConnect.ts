import mongoose from 'mongoose';
// @ts-ignore
mongoose.connect(process.env.STRING_CONECTION_DB);
let db = mongoose.connection;
export default db;
