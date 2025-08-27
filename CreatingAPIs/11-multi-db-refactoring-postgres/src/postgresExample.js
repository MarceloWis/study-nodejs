

async function main(){
  const Herois = driver.define('herois', {
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

  await Herois.sync()

  const result = await Herois.findAll({ raw: true })
  console.log(result)
}

main()
