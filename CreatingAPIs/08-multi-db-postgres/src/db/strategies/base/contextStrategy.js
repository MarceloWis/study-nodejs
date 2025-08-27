const ICrud = require('../interfaces/interfaceCrud')

class ContextStrategy extends ICrud {
  constructor(strategy) {
    super()
    this._dabatase = strategy
  }

  async connect() {
    return this._dabatase.connect()
  }

  async isConnected() {
    return await this._dabatase.isConnected()
  }

  create(item) {
    return this._dabatase.create(item)
   }

  read(query) {
    return this._dabatase.read(query)
  }

  update(id, item) {
    return this._dabatase.update(id, item)
    }

  delete(id) {
    return this._dabatase.delete(id)
  }
}

module.exports = ContextStrategy