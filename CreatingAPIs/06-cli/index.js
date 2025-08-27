const { Command } = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
  const commander = new Command()
  try {

    commander
        .option('-n, --nome <value>', 'Nome do heroi')
        .option('-p, --poder <value>', 'Poder do Heroi')
        .option('-c, --cadastrar', 'Cadastrar um heroi')
        .parse(process.argv)

    console.log(commander.processedArgs)
    const heroi = new Heroi(options)

    if (options.cadastrar) {
        const resultado = await Database.cadastrar(heroi)
        if (!resultado) {
          console.error('Heroi não cadastrado')
          return
        }
        console.log('Heroi cadastrado com sucesso!')
    }

  } catch (error) {
  
  }
}

main()