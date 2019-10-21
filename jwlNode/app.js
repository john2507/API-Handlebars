const express = require ('express');
const handlebars = require ('express-handlebars');
const bodyParser = require ('body-parser')
const Sequelize = require('sequelize')

const CadSetor = require("./models/Tbsetor");
const CadFuncionario = require("./models/TbFuncionario")

//instanciando o modulo para app função
const app = express();
//para manipular diretorio
const path = require ('path');

// importando as rotas dentro da pasta
const admin = require ("./routes/admin");

// <--- configuraçoes --->

//confi handlebars o main é meu tamplet padrao da minha aplicacao
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine','handlebars');

// bodyparser 
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//puclic
const session = require("express-session");
const flash = require ("connect-flash");

//configurando session
app.use(session({
    secret: "cursodenode",
    resave:true,
    saveUninitialized: true
}));


// configurando flash
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
})
//Grupo de rotas que esta dentro do admin
app.use('/admin',admin);

//quardano todo arquivo statico da public
app.use(express.static(path.join(__dirname,"public")))

// porta do servidor
const PORT = 8080
app.listen(PORT, function(){
    console.log("servidor Rodando na Porta 8080");
});