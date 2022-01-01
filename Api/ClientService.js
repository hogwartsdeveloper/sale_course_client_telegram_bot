import axios from "axios";
import { APIUrl } from "../config.js";

class ClientService {
    async create(clientNew) {
        try {
            const response = await axios.post(`${APIUrl}api/clients`, clientNew)
            return response;
        } catch (e) {
            console.log(e)
        }
    }
}

export default new ClientService()