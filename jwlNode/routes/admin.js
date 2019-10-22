const sequelize = require('sequelize');
const express = require ("express");
const router = express.Router();

const CadSetor = require("../models/Tbsetor");
const CadFuncionario = require("../models/TbFuncionario")

// pagina inicial
router.get('/', function(req,res){
    res.render("./admin/index")
})

// router.get('/funcionario', function(req,res){
//     res.render("./admin/funcionario")
// })



/////////////////////SETOR//////////////////////////
router.get('/setor',function(req,res){
    res.render("./admin/setor");
})
////////////////////CADASTRAR NO BANCO DE DADOS SETOR/////////////////////////////
router.post('/setor/add', function(req,res){
    // criando uma msnsagem de erro 
    var erros = []
  
    if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null ){
        erros.push({texto: "Descrição Invalio"})
    }
    // if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
    //     erros.push({texto: "Slug Invalido"});
    // }
    if(req.body.descricao.length < 2){
        erros.push({texto: "Nome Pequeno"});
    }
    if(erros.length > 0){
        res.render('./admin/setor', {erros : erros});
  }else {
    CadSetor.create({
          descricao: req.body.descricao
      }).then(function(){
              req.flash("success_msg", "Setor Cadastrado com Sucesso")
              res.redirect('/admin/setor')
          }).catch(function(erro){
              req.flash("error_msg","Houve um erro ao salvar a Setor")
              res.redirect('/admin')
          // res.send("Erro: Funcionario nao foi cadastrado" + erro);  
          }); 
  
      }
         
  });

/////////////////////////LISTAR O SETOR////////////////////////////////// 
        router.get('/listar', function(req, res){
            CadSetor.findAll({order:[['id', 'ASC']]}).then(function(listar){
                res.render('admin/listarsetor',{listar:listar});
            })
        
        });

///////////////////////EDITAR O SETOR//////////////////////////////////////
        router.get('/setor/edit/:id', (req, res) => {
            CadSetor.findOne({
             where: {'id': req.params.id}
             }).then((listar) => {
                res.render("admin/editsetor", {listar: listar})
            }).catch((err) => {
                req.flash("error_msg", "Esta categoria Nao existe");
                res.redirect("/admin/categorias");
            });
             
             // res.send('PAGINA DE EDIÇÃO DE CATEGORIA');
         });

         router.post("/categorias/edit", function(req, res){
            CadSetor.findOne({
            where: {'id':req.body.id}
        }).then((editar)=>{

            editar.descricao = req.body.descricao
    
            editar.save().then(() =>{
            req.flash("success_msg", "Setor editado com sucesso");
            res.redirect("/admin/listar");  
            }).catch((err)=>{
                req.flash("error_msg", "Houver um Erro interno ao editar categoria")
                res.redirect("/admin/setor");  
            })
        }).catch((err)=> {
            req.flash("error_msg", "houve um erro ao editar");
            res.redirect("/admin/listar");
        });
        });

//////////////////////DELETAR O SETOR///////////////////////////
        router.get('/delsetor/:id', function(req, res){
            CadSetor.destroy({
                where: {'id': req.params.id}
            }).then(function(){
                //res.redirect('/funcionario')/
                req.flash("error_msg", "Setor Excluido com sucesso")
                res.redirect('/admin/listar')
            // res.send("Categoria Excluida com Sucesso");
                }).catch(function(erro){
                res.send("erro ao deletar");
            })
        }); 

///////////////////ROTA de funcionario ///////////////////

                ////pagina inicial///
        router.get('/funcionario',function(req,res){
            res.render('admin/funcionario');
        })

    ////adicionado o setor no formulario FUNCIONARIO////
        router.get('/funcionario/add',function(req,res){
        CadSetor.findAll().then((listar)=>{
            res.render('./admin/addfuncionario', {listar:listar})
        }).catch((err)=>{
            res.flash("error_msg","houve um erro");
            res.render('/admin');
        })
        
    })
    ////////CADSATRAR FUNCIONARIO NO BANCO////////////

    router.post('/funcionario/novo', function(req,res) {
        console.log('criando funcionario')
        var erros =[]

         if (req.body.descricao == "0"){
             erros.push({texto: "Setor Invalia, registre uma categoria"})     
        }
        if (erros.length > 0 ){
            res.render("./admin/addfuncionario",{erros:erros})
        }else{
            CadFuncionario.create({
                nome        : req.body.nome,
                //  sexo        : req.body.sexo,
                // cpf         : req.body.cpf,
                // matricula   : req.body.matricula,
                // ctps        : req.body.ctps,
                //  endereco    : req.body.endereco,
                //  numero      : req.body.numero,
                //  cidade      : req.body.cidade,
                //  bairro      : req.body.bairro,
                //  cep         : req.body.cep,
                setor     : req.body.descricao,
                
                               
            }).then(function(){
                    req.flash("success_msg", "funcionario Cadastrado com Sucesso")
                    res.redirect('/admin/funcionario')
                }).catch(function(erro){
                    req.flash("error_msg","Houve um erro ao salvar a Setor")
                    res.redirect('/admin')

                })
            }
        })

   
module.exports = router;











