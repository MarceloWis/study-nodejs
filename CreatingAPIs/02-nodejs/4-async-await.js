async function obterUsuario() {
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
 
 async function obterTelefone(id) {
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
 
 async function obterEndereco(id) {
  return new Promise((resolve, reject) => {
    if(!id) {
      return reject(new Error("ID não informado"));
    }
    setTimeout(() => {
     return resolve({
       endereco: "Rua dos Bobos, 0",
       cidade: "São Paulo",
       estado: "SP"
     })
   }, 2000)
  })
 }

 async function main() {
  try {
    console.time("main")
    const usuario = await obterUsuario()
    const telefone = await obterTelefone(usuario.id)
    const endereco = await obterEndereco(usuario.id)
    console.log(`Nome: ${usuario.nome} - Endereço: ${endereco.endereco} - Cidade: ${endereco.cidade} - Estado: ${endereco.estado} - Telefone: (${telefone.ddd}) ${telefone.telefone}`);
    console.timeEnd("main")
  } catch (error) {
    console.error("Erro ao obter usuário", error);
  }
 }

 async function main2() {
  try {
    console.time("main2")
    const [usuario, telefone, endereco] = await Promise.all([
      obterUsuario(),
      obterTelefone(1),
      obterEndereco(1)
    ])
    console.log(`Main2 - Nome: ${usuario.nome} - Endereço: ${endereco.endereco} - Cidade: ${endereco.cidade} - Estado: ${endereco.estado} - Telefone: (${telefone.ddd}) ${telefone.telefone}`);
    console.timeEnd("main2")
  } catch (error) {
    console.error("Erro ao obter usuário", error);
  }
 }

 main()
 main2()