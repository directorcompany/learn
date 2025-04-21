const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

// Главная страница
app.get('/', (req, res) => {
  res.send('Бот работает! ✅');
});

// Обработка входящих Telegram-сообщений
app.post('/webhook', async (req, res) => {
  const message = req.body.message;
  if (message && message.text) {
    const chatId = message.chat.id;
    const userText = message.text;

    // Ответ бота
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: `Привет! Вы написали: ${userText}`,
    });
  }
  res.send('ok');
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Бот запущен на порту ${PORT}`);
});