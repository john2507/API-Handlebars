const db = require ('./db');

const CadFuncionario = db.sequelize.define('funcionarios',{

    nome:{
        type:db.Sequelize.STRING
    },
    sexo:{
        type:db.Sequelize.STRING
    },
    cpf:{
        type:db.Sequelize.INTEGER
    },
    matricula:{
        type:db.Sequelize.INTEGER
    },
    ctps:{
        type:db.Sequelize.INTEGER
    },

    endereco:{
        type : db.Sequelize.STRING
    },
    numero:{
        type:db.Sequelize.INTEGER
    },

    cidade:{
        type:db.Sequelize.STRING

    },
    bairro:{
        type: db.Sequelize.STRING
    },

    cep:{
        type:db.Sequelize.INTEGER
    },

    setor:{

       type:db.Sequelize.STRING
    },
    
}).schema('public');

CadFuncionario.associate = (models) => {
    model.belongsTo(models.Tbsetor, {
        foreignKey: 'setor'
    });

};
// CadFuncionario.create({

//  nome:"john"
//  })
//CadFuncionario.sync({force:true});

module.exports = CadFuncionario;    