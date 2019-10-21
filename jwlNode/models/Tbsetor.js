const db = require('./db');

const CadSetor = db.sequelize.define('setores',{

    descricao:{
        type:db.Sequelize.STRING
    }
    
}) 
// CadSetor.create({

// descricao:"oiiiiiiiiiiiiiiiiiii"
// })

//CadSetor.sync({force:true});

module.exports = CadSetor
