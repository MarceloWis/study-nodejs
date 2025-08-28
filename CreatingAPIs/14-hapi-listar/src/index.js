const api = require("./api")

api().start().then(() => {
    console.log('App on 5000')
})