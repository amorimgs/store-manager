const app = require('./app');
const connection = require('./models/connection');

const PORT = process.env.PORT || 3001;

connection.getConnection().then(() => {
  console.log('Banco conectado');
  app.listen(PORT, () => {
    console.log(`Backend do Store Manager escutando na porta ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});