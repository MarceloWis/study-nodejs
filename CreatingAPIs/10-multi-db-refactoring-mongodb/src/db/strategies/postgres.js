
const Sequilize = require('sequelize');
const ICrud = require('./interfaces/interfaceCrud')


class Postgres extends ICrud {
    constructor() {
    super()
    this.driver= null
    this._herois = null
  }

  async isConnected() {
    try {
      await this.driver.authenticate()
      return true
    } catch (error) {
        console.log('Fail!', error)
        return false
    }
  }

  async defineModel() {
    this._herois = this.driver.define('tb_herois', {
      id: {
        type: Sequilize.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequilize.STRING,
        required: true
      },
      poder: {
        type: Sequilize.STRING,
        required: true
      }
    }, {
      tableName: 'tb_herois',
      freezeTableName: false,
      timestamps: false
    })
    await this._herois.sync()
  }

   async connect() {
    this.driver = new Sequilize(
      'heroes', 'marcelowis', 'minhasenhasecreta', {
        host: 'localhost',
        port: 5434,
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorAliases: false
      }
    )
    await this.defineModel()
  }

  async create(item) {
    const {dataValues} =  await this._herois.create(item)
    return dataValues
  }

  async read(query) {
   return this._herois.findAll({
      where: query, 
      raw: true
    })

  }

  async update(id, item) {
     const result = await this._herois.update(item, { where: { id: id }  })
     return result
  }

  async delete(id) {
     const query = id ? { id: id } : {}
     await this._herois.destroy({
      where: query
     })
  }  
}

module.exports = Postgres