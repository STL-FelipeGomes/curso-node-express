import mongoose from 'mongoose';

mongoose.Schema.Types.String.set('validate', {
  validator: (valor: string) => valor.trim() !== '',
  message: ({ path }: { path: string }) =>
    `O campo ${path} foi fornecido em branco`,
});
