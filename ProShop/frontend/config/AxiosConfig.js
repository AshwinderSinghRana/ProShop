import axios from "axios"

const httpGet =axios.create({
    baseURL:"http://localhost:5000"
})

export {httpGet}