/*
  1. Obter o número de um usuário.
  2. Obter o endereço de um usuário.
  3. Obter o número de telefone de um usuário.
*/

function obterUsuario(callback) {
 setTimeout(() => {
    return callback(null,{
        id: 1,
        nome: "Aladin",
        dataNascimento: new Date()
    })
   }, 1000)
}

function obterTelefone(id, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: "1234567890",
      ddd: "11"
    })
  }, 2000)
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



obterUsuario(function resolverUsuario(error, usuario){
  if(error){
    console.error("Erro ao obter usuário");
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
    if(error1){
      console.error("Erro ao obter telefone");
      return;
    }
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
      if(error2 ){
        console.error("Erro ao obter endereço");
        return;
      }
      console.log(`Nome: ${usuario.nome} - Endereço: ${endereco.endereco} - Cidade: ${endereco.cidade} - Estado: ${endereco.estado} - Telefone: (${telefone.ddd}) ${telefone.telefone}`);
    })
  })
})


