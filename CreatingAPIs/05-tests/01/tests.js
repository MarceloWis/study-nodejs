const service = require("./service")
const assert = require("assert")
const nock = require("nock")
describe("Testes de integração", function() {
  beforeEach(async function() {
    nock("https://jsonplaceholder.typicode.com")
    .get("/users/1")
    .reply(200, [{
      address: {
        city: 'Gwenborough',
        geo: {
          lat: '-37.3159',
          lng: '81.1496'
        },
        street: 'Kulas Light',
        suite: 'Apt. 556',
        zipcode: '92998-3874'
      },
      company: {
        bs: 'harness real-time e-markets',
        catchPhrase: 'Multi-layered client-server neural-net',
        name: 'Romaguera-Crona'
      },
      email: 'Sincere@april.biz',
      id: 1,
      name: 'Leanne Graham',
      phone: '1-770-736-8031 x56442',
      username: 'Bret',
      website: 'hildegard.org'
    }])
  })
  it("Deve obter usuários", async function() {
    const expected = {
      address: {
        city: 'Gwenborough',
        geo: {
          lat: '-37.3159',
          lng: '81.1496'
        },
        street: 'Kulas Light',
        suite: 'Apt. 556',
        zipcode: '92998-3874'
      },
      company: {
        bs: 'harness real-time e-markets',
        catchPhrase: 'Multi-layered client-server neural-net',
        name: 'Romaguera-Crona'
      },
      email: 'Sincere@april.biz',
      id: 1,
      name: 'Leanne Graham',
      phone: '1-770-736-8031 x56442',
      username: 'Bret',
      website: 'hildegard.org'
    }
    const result = await service.obterUsuarios(1)
    assert.deepEqual(result[0], expected)
  })
})