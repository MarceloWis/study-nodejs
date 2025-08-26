const axios = require("axios")

const URL = "https://jsonplaceholder.typicode.com/users"

async function obterUsuarios(id) {
    const response = await axios.get(`${URL}?_limit=10`)
    return response.data
}

module.exports = {
    obterUsuarios
}
