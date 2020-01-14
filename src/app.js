const http = require("http");
const express = require('express');

const app = express();

const hostname = "127.0.0.1";
const port = 3000;

app.set("port", port);

app.use((request, response, next) => {
    response.status(404).send();
});

const server = http.createServer(app);

server.listen(port,hostname, () => {
    console.log(`Servidor em execução em http://${hostname}:${port}/`)
})

// O express é um framework que permite a construção de aplicações a partir de middlewares