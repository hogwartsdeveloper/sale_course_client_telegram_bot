import axios from 'axios';
import { APIUrl } from "../config.js";

class GreetService {
    async get() {
        try {
            const response = await axios.get(`${APIUrl}api/greets`)
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new GreetService();