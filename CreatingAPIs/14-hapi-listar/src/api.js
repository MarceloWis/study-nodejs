const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/index')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoutes = require('./routes/heroRoutes')

const app = new Hapi.Server({
  port: 5000
})

async function main() {
  const connection = await MongoDb.connect()
  const context = new Context(new MongoDb(connection, HeroiSchema))
  app.route([
   new HeroRoutes(context).list()
  ])
  await app.start()
  console.log('App on')

  return app
}
module.exports = main()