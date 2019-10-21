const Sequelize = require ('sequelize');

// conectando com a configuração do banco
const sequelize = new Sequelize('jwl','root','123456',{
    host:"localhost",
    dialect:"mysql"
})

// criando um moduls (tabela usuarios e seus atributos)
const Cadastro =  sequelize.define('usuarios',{
        Nome:{
            type:Sequelize.STRING
        },
        Endereco:{
            type:Sequelize.STRING
        }
})

// inserindo no banco de dados 
Cadastro.create({
    Nome:"JOHN WANDERSON",
    endereco: "rua quarenta e novo"
})

// para criar a tabela 
//Cadastro.syns({force:true})
  
//autencicanto  - caso seja sucesso entra no then caso contrato no catch
sequelize.authenticate().then(function(){
console.log("Conectado com Sucesso");
}).catch(function(erro){
    console.log("Falha ao se Conectar"+erro);
})
