const { deepEqual, ok } = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = { nome: 'Flash', poder: 'Speed', id: 1 }
const DEFAULT_ITEM_ATUALIZAR = { nome: 'Lanterna ver', poder: 'Anel', id: 2}


describe("Suite de manipulação de heroies", () => {

  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
  })

  it("Deve pesquisar um heroi, usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const [result] = await database.listar(expected.id)
    deepEqual(result, expected)
  })
  it("Deve cadastrar um heroi, usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    const [result] = await database.listar(DEFAULT_ITEM_CADASTRAR.id) 
    deepEqual(result, expected)
  })

  it('Deve remover um heroi por id', async () => {
    const expected = true
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
    deepEqual(resultado, expected)
  })

  it('Deve atualizar um heroi por id', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'Dinheiro'
    }
    const novoDado = {
      nome: 'Batman',
      poder: 'Dinheiro'
    }
    const resultado = await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
    deepEqual(resultado, expected)
  })

})