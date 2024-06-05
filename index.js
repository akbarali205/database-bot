// const TelegramBot = require('node-telegram-bot-api');
// const token = process.env.TELEGRAM_BOT_TOKEN;
// const bot = new TelegramBot(token, {polling: true});

// bot.on("photo", async (msg) => {
//     const chatId = msg.chat.id;
//     const fileLength = msg.photo.length;
//     const fileId = msg.photo[fileLength - 1].file_id;

//    await bot.getFile(fileId).then((file) => {
//         const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
//         console.log(url);
//         return bot.sendMessage(chatId, url);
//     })
// });

// bot.on("video", async (msg) => {
//     const chatId = msg.chat.id;
//     const fileId = msg.video.file_id;

//    await bot.getFile(fileId).then((file) => {
//         const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
//         console.log(url);
//         return bot.sendMessage(chatId, url);
//     })
// })



// const TelegramBot = require('node-telegram-bot-api');

// // Bot tokenini o'zingizning tokeningiz bilan almashtiring
// const token = process.env.TELEGRAM_BOT_TOKEN || '7495174688:AAElcfwgxlkW_w0QgSSRuUAq-2dep8YjGvY';

// // Webhook URL
// const url = process.env.WEBHOOK_URL || 'https://database-bot.vercel.app/';

// // Botni webhook rejimida ishga tushirish
// const bot = new TelegramBot(token, { webHook: { port: process.env.PORT || 3000 } });

// // Webhook'ni sozlash
// bot.setWebHook(`${url}/bot${token}`);

// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text;

//   // Botga xabar kelganda javob qaytarish
//   bot.sendMessage(chatId, `Siz yozdingiz: ${text}`);
// });


const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
// Bot tokenini o'zingizning tokeningiz bilan almashtiring
const token = process.env.TELEGRAM_BOT_TOKEN || '7495174688:AAElcfwgxlkW_w0QgSSRuUAq-2dep8YjGvY';

// Webhook URL
const url = process.env.WEBHOOK_URL || 'https://database-bot.vercel.app';

// Express ilovasini yarating
const app = express();
app.use(express.json());

// Botni webhook rejimida ishga tushiring
const bot = new TelegramBot(token);
bot.setWebHook(`${url}/bot${token}`);

// Bot uchun endpoint sozlash
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Oddiy xabarlarni qayta ishlash
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  bot.sendMessage(chatId, `Siz yozdingiz: ${text}`);
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
