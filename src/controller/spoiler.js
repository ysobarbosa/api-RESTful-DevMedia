const Spoiler = require("../model/spoiler");

// método usado pelo controller do Spoiler para buscar por um Spoilere
exports.buscarUm = (request, response, next) => {
    const id = request.params.id;

    Spoiler.findById(id)
        .then(spoiler => { //permite definir o bloco executado mediante o cumprimento de uma promise
            if (spoiler) {
                response.send(spoiler);
            } else {
                response.status(404).send();
            }
        })
        .catch(error => next(error)); // permite definir o bloco executado mediante a rejeição de uma promise
};

//Calculo do limite da página atual
exports.buscarTodos = (request, response, next) => {

    // É necessário transformar limite de página em número inteiro, vem do postman
    //Se for informado, ele é pego, se não, eu passo 0
    let limite = parseInt(request.query.limite || 0);
    let pagina = parseInt(request.query.pagina || 0);

    //Limite e página foram convertidos corretamente para integer? se não, manda o status 400/bad request
    if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        response.status(400).send();
    }

    // Essa constante auxilia no calculo de quantidade de itens mínimos e máximos que pode ser colocado por página
    const ITENS_POR_PAGINA = 10;

    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;

    Spoiler.findAll({limit: limite, offset: pagina})
        .then(spoilers => {
            response.send(spoilers);
        })
        .catch(error => next(error));
};

// a sintaxe a seguir pega a requisição no postman, passando parametros de request.body (corpo da requisição) .nome da request
exports.criar = (request, response, next) => {
    const titulo = request.body.titulo;
    const espoliador = request.body.espoliador;
    const descricao = request.body.descricao;

    Spoiler.create({
        titulo: titulo,
        espoliador: espoliador,
        descricao: descricao
    })
        .then(() => {
            response.status(201).send();
        })
        .catch(error => next(error));

};

exports.atualizar = (request, response, next) => {
    const id = request.params.id;

    const titulo = request.body.titulo;
    const espoliador = request.body.espoliador;
    const descricao = request.body.descricao;

    Spoiler.findById(id)
        .then(spoiler => {
            if (spoiler) {
                Spoiler.update(
                    {
                        titulo: titulo,
                        espoliador: espoliador,
                        descricao: descricao
                    },
                    {where: {id: id}}
                )
                    .then(() => {
                        response.send();
                    })
                    .catch(error => next(error));
            } else {
                response.status(404).send();
            }
        })
        .catch(error => next(error));
};

exports.excluir = (request, response, next) => {
    const id = request.params.id;

    Spoiler.findByid(id)
        .then(spoiler => {
            if (spoiler) {
                Spoiler.destroy({
                    where: {id: id}
                })
                    .then(() => {
                        response.send();
                    })
                    .catch(error => next(error));
            } else {
                response.status(404).send();
            }
        })
        .catch(error => next(error));
};


// Arrow function (=>) é uma forma resumida de escrever funções anônimas em JavaScript