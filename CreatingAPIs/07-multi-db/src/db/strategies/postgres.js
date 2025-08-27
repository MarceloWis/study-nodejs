
const ICrud = require('./interfaces/interfaceCrud')

class Postgres extends ICrud {
    constructor() {
    super()
  }

  isConnected() {}

  _connect() {}

  create(item) {
    
  }

  read(query) {
     
  }

  update(id, item) {
     
  }

  delete(id) {
     
  }  
}

module.exports = Postgres