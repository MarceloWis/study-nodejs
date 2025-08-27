
const Sequilize = require('sequelize');
const ICrud = require('../interfaces/interfaceCrud')


class Postgres extends ICrud {
    constructor(connection, schema) {
    super()
    this.connection= connection
    this._schema = schema
  }

  async isConnected() {
    try {
      await this.connection.authenticate()
      return true
    } catch (error) {
        console.log('Fail!', error)
        return false
    }
  }
  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema,  schema.options)
    await model.sync()
    return model
  }

   static async connect() {
    const connection = new Sequilize(
      'heroes', 'marcelowis', 'minhasenhasecreta', {
        host: 'localhost',
        port: 5434,
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorAliases: false
      }
    ) 
    return connection
  }

  async create(item) {
    const {dataValues} =  await this._schema.create(item)
    return dataValues
  }

  async read(query) {
   return this._schema.findAll({
      where: query, 
      raw: true
    })

  }

  async update(id, item) {
     const result = await this._schema.update(item, { where: { id: id }  })
     return result
  }

  async delete(id) {
     const query = id ? { id: id } : {}
     await this._schema.destroy({
      where: query
     })
  }  
}

module.exports = Postgres