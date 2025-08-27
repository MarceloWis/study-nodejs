const assert = require('assert');
const Postgres = require('../../src/db/strategies/postgres');
const Context = require('../../src/db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROIS_CADASTRAR = { nome: 'Gavião Negro', poder: 'Flexas' }
const MOCK_HEROIS_ATUALIZAR = { nome: 'Javascript', poder: 'Dominação' }
let db = null;


describe('Postgres Strategy', function() {
  this.beforeAll(async () => {
    db = await context.connect()
    await context.delete()
    await context.create(MOCK_HEROIS_ATUALIZAR)
  })
  it('PostgresSQL connection', async () => {
    const result = await context.isConnected()
    assert.equal(result, true)
  })
  it('Cadastrar', async () => {
    const result = await context.create(MOCK_HEROIS_CADASTRAR)
    delete result.id
    assert.deepEqual(result, MOCK_HEROIS_CADASTRAR)
  })
  it('Listar', async () => {
    const [result] = await context.read({ nome: MOCK_HEROIS_CADASTRAR.nome })
    delete result.id
    assert.deepEqual(result, MOCK_HEROIS_CADASTRAR)
  })
  it('Atualizar', async () => {
    const [read] = await context.read({ nome: MOCK_HEROIS_CADASTRAR.nome })
    await context.update(read.id, MOCK_HEROIS_ATUALIZAR)
    const [result] = await context.read({ id: read.id })
    delete result.id
    assert.deepEqual(result, MOCK_HEROIS_ATUALIZAR)
  })
  it('Deletar', async function() {
    const [read] = await context.read({ nome: MOCK_HEROIS_ATUALIZAR.nome })
    await context.delete(read.id)
    const [result] = await context.read({ id: read.id })

    assert.equal(result, undefined)
  })
}) 