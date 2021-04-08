const express = require('express');
const path = require('path');
const porta = process.env.PORT || 3000;
const routes = require('./routes');
const server = express();
//
// Habilitar rotas para acesso aos arquivos estaticos do projeto.
server.use(express.static(path.join(__dirname, '../public')));
// Liberar acesso aos dados de request.body na rotas.
server.use(express.urlencoded({ extended: true }));
// .set seta uma propriedade para o servidor express. (Habilitar a template engine EJS no projeto.)
server.set('view engine', 'ejs');
// Setar a localidade dos arquivos ejs do projeto.
server.set('views', path.join(__dirname, 'views'));
// Rotas do Sistema
server.use(routes);

// Habilitar Servidor NodeJs na porta 3000
server.listen(porta, (err) => {
    if (err) {
        throw errors
    } else {
        console.log('App Discover rodando na porta 3000!');
    };
})