const assert = require('assert');
const MongoDB = require('../../src/db/strategies/mongodb');
const Context = require('../../src/db/strategies/base/contextStrategy')

const context = new Context(new MongoDB())
const MOCK_HEROIS_CADASTRAR = { nome: 'Gavião Negro', poder: 'Flexas' }
const MOCK_HEROIS_ATUALIZAR = { nome: 'Javascript', poder: 'Dominação' }

describe('MongoDB Strategy', function () {
  this.beforeAll(async () => {
    await context.connect()
  })
  it('MongoDB connection', async () => {
    const result = await context.isConnected()
    assert.deepEqual(result, 'Conectado')
  })
  it('Cadastrar', async () => {
    const { nome, poder } = await context.create(MOCK_HEROIS_CADASTRAR)
    assert.deepEqual({ nome, poder }, MOCK_HEROIS_CADASTRAR)
  })
  it('Listar', async () => {
    const [{ nome, poder }] = await context.read({ nome: MOCK_HEROIS_CADASTRAR.nome })

    assert.deepEqual({ nome, poder }, MOCK_HEROIS_CADASTRAR)
  })


  it('Atualizar', async () => {
    const [read] = await context.read({ nome: MOCK_HEROIS_CADASTRAR.nome })
    await context.update(read._id, MOCK_HEROIS_ATUALIZAR)
    const [{ nome, poder }] = await context.read({ _id: read._id })
    assert.deepEqual({ nome, poder }, MOCK_HEROIS_ATUALIZAR)
  })
  it('Deletar', async function() {
      const [read] = await context.read({ nome: MOCK_HEROIS_CADASTRAR.nome })

      await context.delete(read._id)

      const result = await context.read({ _id: read._id })
      assert.deepEqual([], result)
  })
})