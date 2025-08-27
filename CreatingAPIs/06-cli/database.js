const { readFile, writeFile } = require('fs/promises')
class Database {
  constructor() {
    this.NOME_ARQUIVO = 'herois.json'
  }

  async obterDadosArquivo() {
      const file = await readFile(this.NOME_ARQUIVO, 'utf8')
      return JSON.parse(file)
  }

  async escreverArquivo(data) {
    await writeFile(this.NOME_ARQUIVO, JSON.stringify(data))
    return true
  }

  async cadastrar(heroi) {
    const arquivo = await this.obterDadosArquivo()
    const id = heroi.id <= 2 ? heroi.id : Date.now()

    const novoHeroi = {
      ...heroi,
      id
    }

    const novoArquivo = [...arquivo, novoHeroi]
    return await this.escreverArquivo(novoArquivo)
  } 

  async listar(id) {
    const dados = await this.obterDadosArquivo()
    const dadosFiltrados = dados.filter(item => id ? item.id === id : true)
    return dadosFiltrados
  }

  async remover(id) {
    if(!id) {
      return await this.escreverArquivo([])
    }
    const dados = await this.listar();
    const index = dados.findIndex(item => item.id === id)
    if(index === -1) {
      throw new Error("O usuario informou um id invalido");
    }
    dados.splice(index, 1)
    return await this.escreverArquivo(dados)
  }

  async atualizar(id, modificacoes) {
      const dados = await this.listar();
      const index = dados.findIndex(item => item.id === parseInt(id))
      if(index === -1) {
        throw new Error("O usuario informou um id invalido");
      }
      const atual = dados[index]
      const objetoAtualizar = {
        ...atual,
        ...modificacoes
      }
      dados.splice(index, 1)
      
      await this.escreverArquivo([
        ...dados,
        objetoAtualizar
      ])
      return objetoAtualizar
  }
}

module.exports = new Database()