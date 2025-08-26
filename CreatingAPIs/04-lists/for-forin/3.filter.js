const service = require("./service")

Array.prototype.meuFilter = function(callback) {
  const novoArray = []
  for(item in this) {
    const resultado = callback(this[item], item)
    if(resultado) {
      novoArray.push(this[item])
    }
  }
  return novoArray
}

async function Filter() {
  try {
    const result = await service.obterUsuarios()
    console.time("filter")
    const usuario = result.filter(function(usuario) {
      return  usuario.id > 5
    })
    .map(result => result.name)
    console.timeEnd("filter")
    console.log(usuario)
    console.log(`Total de usuários: ${usuario.length}`)
  } catch (error) {
    console.log("Erro ao obter usuário", error)
  } finally {
    console.log("--------------------------------")
  }
}


Filter()
MeuFilter()

async function MeuFilter() {
  try {
    const result = await service.obterUsuarios()
    console.time("meuFilter")
    const usuario = result.meuFilter(function(usuario) {
      return  usuario.id > 5
    })
    .map(result => result.name)
    console.timeEnd("meuFilter")
    console.log(usuario)
    console.log(`Total de usuários: ${usuario.length}`)
  } catch (error) {
    console.log("Erro ao obter usuário", error)
  } finally {
    console.log("--------------------------------")
  }
}