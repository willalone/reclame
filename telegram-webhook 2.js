// Простой сервер для отправки сообщений в Telegram
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Telegram bot configuration
const BOT_TOKEN = '8026350498:AAGcyKMsrJyD0mGgj26Ss2m49vX5jp8LzaM';
const CHAT_ID = '919481169';

// Endpoint для отправки сообщений
app.post('/send-message', async (req, res) => {
  try {
    const { name, phone, answers } = req.body;
    
    // Форматируем сообщение
    const message = `🏠 Новая заявка с квиза "Самолет МКР"

👤 Имя: ${name}
📞 Телефон: ${phone}

📝 Ответы на вопросы:
${Object.entries(answers).map(([key, value]) => {
  const questions = [
    { id: 1, question: "Какое количество комнат вы рассматриваете?" },
    { id: 2, question: "Какой вариант отделки вы рассматриваете?" },
    { id: 3, question: "Какой способ покупки квартиры вы рассматриваете?" }
  ];
  const question = questions.find(q => q.id === parseInt(key));
  return `• ${question?.question}: ${value}`;
}).join('\n')}

⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

    // Отправляем в Telegram
    const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message
    });

    res.json({ success: true, message: 'Сообщение отправлено' });
  } catch (error) {
    console.error('Ошибка отправки:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
