const service = require("./service")


Array.prototype.meuMap = function(callback) {
  const novoArray = []
  for(let i = 0; i <= this.length - 1; i++) {
    const resultado = callback(this[i], i)
    novoArray.push(resultado)
  }
  return novoArray
}

async function Map() {
  try {
    const result = await service.obterUsuarios()
    console.time("map")
    const usuario = result.map(function(usuario) {
      return  usuario.name
    })
    console.timeEnd("map")
    console.log(usuario)
  } catch (error) {
    console.log("Erro ao obter usuário", error)
  } finally {
    console.log("--------------------------------")
  }
}
async function ForEach() {
  try {
    const result = await service.obterUsuarios()
    const nomes = []
    console.time("forEach")
    result.forEach(function(usuario) {
      nomes.push(usuario.name)
    })
    console.timeEnd("forEach")
    console.log(nomes)
  } catch (error) {
    console.log("Erro ao obter usuário", error)
  } finally {
    console.log("--------------------------------")
  }
}

async function MeuMap() { 
  try {
    const result = await service.obterUsuarios()
    console.time("meuMap")
    const usuario = result.meuMap(function(usuario, indice) {
      return `${indice} - ${usuario.name} - ${usuario.email}`
    })
    console.timeEnd("meuMap")
    console.log(usuario)
  } catch (error) {
    console.log("Erro ao obter usuário", error)
  } finally {
    console.log("--------------------------------")
  }
}

Map()
ForEach()
MeuMap()