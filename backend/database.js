const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mssql',
  host: '192.168.15.12', 
  port: 51576, 
  database: 'searchpet', 
  username: 'sa', 
  password: 'password', 
  dialectOptions: {
    options: {
      encrypt: true, 
      enableArithAbort: true, 
    },
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão bem-sucedida!');
  })
  .catch((error) => {
    console.error('Erro ao conectar:', error);
  });


module.exports = { sequelize, DataTypes };
