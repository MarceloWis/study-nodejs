const ICrud = require('./interfaces/interfaceCrud')

class MongoDb extends ICrud {
  constructor() {
    super()
  }

  create(item) {
    console.log('O item foi salvo no mongo')
  }

  read(query) {
     
  }

  update(id, item) {
     
  }

  delete(id) {
     
  }  
}

module.exports = MongoDb