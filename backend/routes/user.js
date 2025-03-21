const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// 📝 Cadastro de Usuário
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body; // Usando 'password' como estava

        console.log("Dados recebidos:", { name, email, password }); // Adicionando log

        // Validação para garantir que o e-mail seja único
        const usuarioExistente = await User.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ message: "E-mail já cadastrado!" });
        }

        // Criando o novo usuário diretamente com a senha sem hash
        const novoUsuario = await User.create({ name, email, password }); // Salvando a senha diretamente

        // Resposta de sucesso
        res.json({ message: "Usuário cadastrado com sucesso!", user: novoUsuario });
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        res.status(500).json({ message: "Erro ao cadastrar usuário!", error });
    }
});

// 🔑 Login de Usuário
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body; // Usando 'password' como estava
        
        // Verificando se o usuário existe no banco
        const usuario = await User.findOne({ where: { email } });

        // Se não encontrar o usuário ou a senha não bater
        if (!usuario || usuario.password !== password) { // Comparando a senha diretamente
            return res.status(401).json({ message: "Credenciais inválidas!" });
        }

        // Gerando um token JWT
        const token = jwt.sign({ id: usuario.id }, "secreto", { expiresIn: "1h" });

        // Respondendo com sucesso e o token JWT
        res.json({ message: "Login realizado!", token, name: usuario.name });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ message: "Erro ao fazer login!", error });
    }
});


module.exports = router;
