const TelegramBot = require('node-telegram-bot-api');
const token = "7495174688:AAElcfwgxlkW_w0QgSSRuUAq-2dep8YjGvY";
const bot = new TelegramBot(token, {polling: true});

bot.on("photo", (msg) => {
    const chatId = msg.chat.id;
    const fileLength = msg.photo.length;
    const fileId = msg.photo[fileLength - 1].file_id;

    bot.getFile(fileId).then((file) => {
        const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
        console.log(url);
        return bot.sendMessage(chatId, url);
    })
});

bot.on("video", (msg) => {
    const chatId = msg.chat.id;
    const fileId = msg.video.file_id;

    bot.getFile(fileId).then((file) => {
        const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
        console.log(url);
        return bot.sendMessage(chatId, url);
    })
})