const axios = require('axios');

const BOT_TOKEN = '8026350498:AAGcyKMsrJyD0mGgj26Ss2m49vX5jp8LzaM';
const CHAT_ID = '919481169';

export default async function handler(req, res) {
  // Настройка CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, answers } = req.body;
    
    if (!name || !phone || !answers) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const message = `🏠 Новая заявка с квиза "Самолет МКР"

👤 Имя: ${name}
📞 Телефон: ${phone}

📝 Ответы на вопросы:
${answers.map(item => `• ${item.question}: ${item.answer}`).join('\n')}

⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message
    });

    res.json({ success: true, message: 'Сообщение отправлено' });
  } catch (error) {
    console.error('Ошибка отправки:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
