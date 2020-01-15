const http = require("http");
const express = require('express');
const spoilersRoutes = require('./router/spoilers');

const app = express();

const hostname = "127.0.0.1";
const port = 3000;

app.set("port", port);

//configura a api para trazer um retorno em json para o cliente
app.use(express.json());

app.use('/api', spoilersRoute)
;
app.use((request, response, next) => {
    response.status(404).send();
});

const server = http.createServer(app);

server.listen(port,hostname, () => {
    console.log(`Servidor em execução em http://${hostname}:${port}/`)
})

// O express é um framework que permite a construção de aplicações a partir de middlewares