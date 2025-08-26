const EventEmitter = require("events")

class MeuEmitter extends EventEmitter {}

const meuEmitter = new MeuEmitter()
const nomeEvento = "usuario:click";

meuEmitter.on(nomeEvento, function (click) {
    console.log("Um usuário clicou", click)
})

// meuEmitter.emit(nomeEvento, "no botão")
// meuEmitter.emit(nomeEvento, "no input")
// meuEmitter.emit(nomeEvento, "no link")

const stdin = process.openStdin()

stdin.addListener("data", function(value) {
    console.log(`Você digitou: ${value.toString().trim()}`)
})