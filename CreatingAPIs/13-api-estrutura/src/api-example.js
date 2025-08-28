const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/index')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')


const app = new Hapi.Server({
  port: 5000
})

async function main() {
  const connection = await MongoDb.connect()
  const context = new Context(new MongoDb(connection, HeroiSchema))
  app.route([
    {
      path: '/herois',
      method: 'GET',
      handler: async (request, repsonse)  => {
        return context.read()
      }
    }
  ])
  await app.start()
  console.log('App on')
}
main()