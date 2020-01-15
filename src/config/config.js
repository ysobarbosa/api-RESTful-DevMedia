module.exports = {
    development: {
        database: {
            host: 'localhost',
            port: 3306,
            name: 'spoiler',
            database: 'mysql',
            user: 'root',
            password: '123456'
        }
    },
    production: {
        database: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT
        }
    }
};

/*
* ORM = mapeamento objeto-relacional é uma tecnica de desenvolvimento em que tabelas do banco de dados são representadas através de cclasses
* e os registros de cada tabela são representados como instâncias das classes
* */