const Mongoose = require('mongoose')
const ICrud = require('./interfaces/interfaceCrud')
const STATUS = {
  0: 'Desconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Desconectando'
}
class MongoDb extends ICrud {
  constructor() {
    super()
    this._heroes = null
  }

  async isConnected(){
    const state = STATUS[this.driver.readyState]
    if(state === 'Conectado')  return 'Conectado'
    if(state !== 'Conectando') return state 
    await new Promise(resolve => setTimeout(resolve, 1000))
    return  STATUS[this.driver.readyState]
  }

  async connect() {
    try {
      await Mongoose.connect(
        'mongodb://marcelowis:admin@localhost:27017/herois',
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      console.log('Database rodando!')
      this.driver  = Mongoose.connection
      this.driver.once('open', () => console.log('Database rodando!'))
      this.driver.once('error', (e) =>console.log(e))
      await this.defineSchema()
    } catch (error) {
      console.log('Falha na conexão', error)
    }

  }

  async defineSchema() {
    const heroiSchema = new Mongoose.Schema({
      nome: {
        type: String,
        require: true
      },
      poder: {
        type: String,
        require: true
      },
      insertedAt: {
        type: Date,
        default: new Date()
      }
    })

    this._heroes = Mongoose.model('Heroi', heroiSchema)
  }

  async create(item) {
    const result = await this._heroes.insertOne(item)
    return result.toJSON()
  }

  async read(query, limit = 1) {
    console.log(query)
     const result = await this._heroes.find(query).limit(limit)
     return result
  }

  async update(id, item) {
     return this._heroes.updateOne({ _id: id }, { $set: {...item} })
  }

  async delete(id) {
      return this._heroes.findOneAndDelete({
        _id: id
      })
  }  
}

module.exports = MongoDb