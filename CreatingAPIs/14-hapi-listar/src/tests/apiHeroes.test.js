const assert = require('assert')
const api = require("../api")


describe('Suite de testes da API Heroes', function() {
  this.beforeAll(async () => {
    
    app = await api
  })
    it('listar /herois', async () => {
      const result = await app.inject({
        method: 'GET',
        url: '/herois?skip=0&limit=1232323'
      })
      const dados = JSON.parse(result.payload)
      const statusCode = result.statusCode

      assert.deepEqual(statusCode, 200)
      assert.ok(Array.isArray(dados))
    })

    it('listar /herois e retornar somente 1 registros', async () => {
      const result = await app.inject({
        method: 'GET',
        url: '/herois?skip=0&limit=1'
      })

      const dados = JSON.parse(result.payload)
      const statusCode = result.statusCode

      assert.deepEqual(statusCode, 200)
      assert.deepEqual(dados.length, 1)
      assert.ok(Array.isArray(dados))
    })

        it('listar /herois e retornar somente 1 registros', async () => {
      const result = await app.inject({
        method: 'GET',
        url: '/herois?skip=0&limit=10&nome=Javascript'
      })

      const dados = JSON.parse(result.payload)
      const statusCode = result.statusCode

      assert.deepEqual(statusCode, 200)
      assert.deepEqual(dados.length, 1)
      assert.ok(dados[0].nome === 'Javascript')
    })

  it('listar /herois deve retornar erro 500', async () => {
      const result = await app.inject({
        method: 'GET',
        url: '/herois?skip=0&limit=eeeeeee&nome=marcelowis'
      })
      assert.deepEqual(result.payload, 'Erro Interno')
    })

})