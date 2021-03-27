const express = require('express');
const path = require('path');
const porta = 3000 || PORT;
const routes = require('./routes');
const server = express();
//
// Habilitar rotas para acesso aos arquivos estaticos do projeto.
server.use(express.static(path.join(__dirname, '../public')));
// 
// .set seta uma propriedade para o servidor express. (Habilitar a template engine EJS no projeto.)
server.set('view engine', 'ejs');
// Rotas do Sistema
server.use(routes);

// Habilitar Servidor NodeJs na porta 3000
server.listen(porta, (err) => {
    if (err) {
        throw errors
    } else {
        console.log('Servidor Rodando na Porta 3000!');
    };
})