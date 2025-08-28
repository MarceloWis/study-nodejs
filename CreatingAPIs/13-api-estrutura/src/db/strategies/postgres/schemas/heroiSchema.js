const Sequilize = require('sequelize');

const HeroiSchema = {
  name: 'herois',
  schema: {
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
  },
  options: {
    tableName: 'tb_herois',
    freezeTableName: false,
    timestamps: false
  }
}

module.exports = HeroiSchema