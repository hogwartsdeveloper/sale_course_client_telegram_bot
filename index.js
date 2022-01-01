import TelegramApi from "node-telegram-bot-api";
import GreetService from './Api/GreetService.js';
import ClientService from "./Api/ClientService.js";
import { APIUrl } from "./config.js";
import { token } from "./config.js";


const bot = new TelegramApi(token, {polling: true})
const picture = (await GreetService.get()).data[0].picture

const sendClientData = async (clientData) => {
    const client = await ClientService.create(clientData)
    return client;
}

const data = {}

const start = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text == '/start') {
            await bot.sendPhoto(chatId, APIUrl+'/'+picture)
            bot.sendMessage(chatId, 'Добро пожаловать в продажа чего-либо')
            return bot.sendMessage(chatId, 'Хотите узнать подробнее? Наш менеджер вам позвонить, оставьте номер плиз')
            data[chatId] = false;
        }
        if (!isNaN(text) || text.length > 10) {
            const clientData = {username: msg.from.username || 'noUserName', name: msg.from.first_name, number: text,}
            sendClientData(clientData)
            bot.sendMessage(chatId, "Ваш номер принят")
            bot.sendMessage(chatId, 'скоро вам позвонят')
            data[chatId] = true;
        }
        data[chatId]
            ?
            bot.sendMessage(chatId, 'Терпение вам позвонят')
            :
            bot.sendMessage(chatId, 'Вы кажется указали не правильный номер')
    })
}

start()