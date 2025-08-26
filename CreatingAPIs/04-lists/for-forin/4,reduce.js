const service = require("./service")

Array.prototype.meuReduce = function(callback, valorInicial) {
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]

  for(let i = 0; i < this.length; i++) {
    valorFinal = callback(valorFinal, this[i], i, this)
  }

  return valorFinal
}

async function Reduce() {
  try {
    const result = await service.obterUsuarios()
    console.time("reduce")
    const usuario = result.map(item => item.id)
    .reduce((anterior, atual) => {
      return anterior + atual
    }, 0)
    console.timeEnd("reduce")
    console.log(usuario)
  } catch (error) {
    console.log("Erro ao obter usuário", error)
  } finally {
    console.log("--------------------------------")
  }
}

Reduce()

async function MeuReduce() {
  try {
    const result = await service.obterUsuarios()
    console.time("meuReduce")
    const usuario = result
    .map(item => item.id)
    .meuReduce((anterior, atual) => {
      return anterior + atual
    }, 0)
    console.timeEnd("meuReduce")
    console.log(usuario)
  } catch (error) {
    console.log("Erro ao obter usuário", error)
  } finally {
    console.log("--------------------------------")
  }
}

MeuReduce() 