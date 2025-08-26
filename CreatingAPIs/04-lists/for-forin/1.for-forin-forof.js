const service = require("./service")

async function main() {
  try {
    const result = await service.obterUsuarios()
    console.time("for")
    for(let i = 0; i < result.length; i++) {
      const usuario = result[i]
      console.log(`ID: ${usuario.id} - Nome: ${usuario.name} - Email: ${usuario.email}`)
    }
    console.timeEnd("for")
  } catch (error) {
    console.log("Erro ao obter usuário", error)
  } finally {
    console.log("--------------------------------")
  }
}

async function main2() {
  try {
    const result = await service.obterUsuarios()
    console.time("forin")
    for (let i in result) {
      const usuario = result[i]
      console.log(`ID: ${usuario.id} - Nome: ${usuario.name} - Email: ${usuario.email}`)
    }
    console.timeEnd("forin")
  } catch (error) {
    console.log("Erro ao obter usuário", error)
  } finally {
    console.log("--------------------------------")
  }
}

async function main3() {  
  try {
    const result = await service.obterUsuarios()
    console.time("forof")
    for (let usuario of result) {
      console.log(`ID: ${usuario.id} - Nome: ${usuario.name} - Email: ${usuario.email}`)
    }
    console.timeEnd("forof")
  } catch (error) {
    console.log("Erro ao obter usuário", error)
  } finally {
    console.log("--------------------------------")
  }
}

main()
main2()
main3()