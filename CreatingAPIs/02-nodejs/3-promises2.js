/*
  1. Obter o número de um usuário.
  2. Obter o endereço de um usuário.
  3. Obter o número de telefone de um usuário.
*/

const util = require("util")
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  return new Promise((resolve, reject) => {
  setTimeout(() => {
     return resolve({
         id: 1,
         nome: "Aladin",
         dataNascimento: new Date()
     })
    }, 1000)
  })
 }
 
 function obterTelefone(id) {
   return new Promise((resolve, reject) => {
    if(!id) {
      return reject(new Error("ID não informado"));
    }
   setTimeout(() => {
     return resolve({
       telefone: "1234567890",
       ddd: "11"
     })
   }, 2000)
  })
 }
 
 function obterEndereco(id, callback) {
   setTimeout(() => {
     return callback(null, {
       endereco: "Rua dos Bobos, 0",
       cidade: "São Paulo",
       estado: "SP"
     })
   }, 2000)
 }
 
 
 
const usuarioPromise = obterUsuario()

usuarioPromise
 .then(function resolverUsuario(usuario) {
  return obterTelefone(usuario.id).then(function resolverTelefone(telefone) {
    return {
      usuario,
      telefone
    }
  })  
 })
 .then(function resolverTelefone(resposta) {
  return obterEnderecoAsync(resposta.usuario.id).then(function resolverEndereco(endereco) {
    return {
      usuario: resposta.usuario,
      telefone: resposta.telefone,
      endereco
    }
  })
 })
.then(function(resposta) {
  console.log(`Nome: ${resposta.usuario.nome} - Endereço: ${resposta.endereco.endereco} - Cidade: ${resposta.endereco.cidade} - Estado: ${resposta.endereco.estado} - Telefone: (${resposta.telefone.ddd}) ${resposta.telefone.telefone}`);
})
.catch(function(error) {
  console.error("Erro ao obter usuário", error); 
})
