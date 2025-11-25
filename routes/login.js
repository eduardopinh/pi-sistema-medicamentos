const express = require('express');
// Responsável pela exportação da 
// rota para o arquivo "app.js"
const router = express.Router();

// Rota raiz - redireciona para a página home
router.get('/', (req, res) => {
    if (req.session.user) return res.redirect('/home');
    res.redirect('/login');
});

// Página de login
router.get('/login', (req, res) => {
    res.render('login', { error: null, old: {} });
});

// Processa o login
router.post('/login', (req, res) => {
    const { nome, email, senha } = req.body;
// Basic validation
    if (!email || !senha) {
        return res.status(400).render('login', { 
        error: 'Preencha email e senha.', 
        old: { nome, email } 
    });
}


// Demo auth: accept any non-empty password; set session
    req.session.user = {
        nome: nome || email.split('@')[0],
        email
    };


    res.redirect('/home');
});

// Página home (trancada)
router.get('/home', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('home', { user: req.session.user });
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
    res.clearCookie('connect.sid');
    res.redirect('/login');
    });
});

module.exports = router;