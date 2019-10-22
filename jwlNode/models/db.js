//conexao com o banco,expostando e validando

const Sequelize = require ('sequelize');

const sequelize = new Sequelize('ficr','root','',{
    host:"localhost",
    dialect:'mysql'
})

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize
    }

sequelize.authenticate().then(function(){
    console.log("Banco de Dados Conectado com Sucesso");
}).catch(function(erro){
    console.log("Erro ao conectar ao banco" + erro);
})