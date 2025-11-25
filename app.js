// Importação dos pacotes
// Instância para o Express
const express = require('express');
const session = require('express-session');
const path = require('path');

// Rotas
const loginRoutes = require("./routes/login")


const app = express();
const PORT = process.env.PORT || 3000;


// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurações
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'troque-por-uma-chave-secreta',
    resave: false,  
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Confguração dos middlewares

// Importação das rotas
app.use("/", loginRoutes);

// Exemplo de próximas rotas:
// app.use("/", userRoutes);


// Execução do servidor

// Exportando o app para o server.js
module.exports = app;