const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./database");  // Corrigido para importar a instância do Sequelize
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

// Sincronizar com o banco e iniciar o servidor
sequelize.authenticate()  // Tenta se conectar com o banco
    .then(() => {
        console.log('Conexão com o banco de dados foi bem-sucedida!');
        
        // Sincronizando os modelos com o banco de dados (se necessário)
        sequelize.sync({ force: false })  // { force: false } para evitar apagar dados
            .then(() => {
                console.log('Banco de dados sincronizado!');
                app.listen(3000, () => {
                    console.log("Servidor rodando na porta 3000!");
                });
            })
            .catch((syncError) => {
                console.error('Erro ao sincronizar o banco de dados:', syncError);
            });
    })
    .catch((error) => {
        console.error('Erro ao conectar com o banco de dados:', error);
    });
