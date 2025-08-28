const BaseRoutes = require("./base/baseRoutes")

class HeroRoutes extends BaseRoutes{
  constructor(db) {
    super()
    this.db = db
  }

  list() {
    return {
      path: '/herois',
      method: 'GET',
      handler: (request, response) => {
        try {
          const { nome, skip, limit } = request.query
          let query = nome ? { nome } : {}
          if(isNaN(skip)) {
            throw new Error("Erro interno");
          }

          if(isNaN(limit)){
            throw new Error("Erro interno");
          }


          return this.db.read(query, parseInt(skip), parseInt(limit))
        } catch (error) {
          console.log("Error", error)
          return "Erro Interno"
        }
      }
    }
  }
}
module.exports = HeroRoutes