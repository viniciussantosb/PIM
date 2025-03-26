const { sequelize, DataTypes } = require('../database'); // Importa a instância do Sequelize

// Definindo o modelo User
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,  // Desabilita os campos 'createdAt' e 'updatedAt'
});

// Exportando o modelo para ser utilizado em outros lugares
module.exports = User;