const Mongoose = require('mongoose')
const ICrud = require('../interfaces/interfaceCrud')
const STATUS = {
  0: 'Desconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Desconectando'
}
class MongoDb extends ICrud {
  constructor(connection, schema) {
    super()
    this.connection = connection
    this.schema = schema
  }

  async isConnected(){
    console.log(this.connection)
    const state = STATUS[this.connection.readyState]
    if(state === 'Conectado')  return 'Conectado'
    if(state !== 'Conectando') return state 
    await new Promise(resolve => setTimeout(resolve, 1000))
    return  STATUS[this.connection.readyState]
  }

  static async connect() {
    try {
      await Mongoose.connect(
        'mongodb://marcelowis:admin@localhost:27017/herois',
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      console.log('Database rodando!')
      const connection  = Mongoose.connection
      connection.once('open', () => console.log('Database rodando!'))
      connection.once('error', (e) =>console. log(e))
      return connection

    } catch (error) {
      console.log('Falha na conexão', error)
    }

  }

  async create(item) {
    const result = await this.schema.insertOne(item)
    return result.toJSON()
  }

  async read(query, limit = 1) {
    console.log(query)
     const result = await this.schema.find(query).limit(limit)
     return result
  }

  async update(id, item) {
     return this.schema.updateOne({ _id: id }, { $set: {...item} })
  }

  async delete(id) {
      return this.schema.findOneAndDelete({
        _id: id
      })
  }  
}

module.exports = MongoDb