const TelegramBot = require('node-telegram-bot-api');
const token = "7495174688:AAElcfwgxlkW_w0QgSSRuUAq-2dep8YjGvY";
const bot = new TelegramBot(token, {polling: true});
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


bot.on("photo", async (msg) => {
    const chatId = msg.chat.id;
    const fileLength = msg.photo.length;
    const fileId = msg.photo[fileLength - 1].file_id;

   await bot.getFile(fileId).then((file) => {
        const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
        console.log(url);
        return bot.sendMessage(chatId, url);
    })
});

bot.on("video", async (msg) => {
    const chatId = msg.chat.id;
    const fileId = msg.video.file_id;

   await bot.getFile(fileId).then((file) => {
        const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
        console.log(url);
        return bot.sendMessage(chatId, url);
    })
})