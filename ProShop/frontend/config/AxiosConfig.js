import axios from "axios";

const httpGet = axios.create({
    baseURL: "http://localhost:1221",
    
});

export { httpGet };
