// Telegram bot configuration
export const BOT_TOKEN = '8026350498:AAGcyKMsrJyD0mGgj26Ss2m49vX5jp8LzaM'
export const CHAT_ID = '919481169'

// Telegram API URL (с прокси для разработки)
const isDev = import.meta.env.DEV
export const TELEGRAM_API_URL = isDev 
  ? '/api/telegram/bot8026350498:AAGcyKMsrJyD0mGgj26Ss2m49vX5jp8LzaM/sendMessage'
  : 'https://api.telegram.org/bot8026350498:AAGcyKMsrJyD0mGgj26Ss2m49vX5jp8LzaM/sendMessage'

// Альтернативный способ - прямые константы
export const TELEGRAM_API_URL_DEV = '/api/telegram/bot8026350498:AAGcyKMsrJyD0mGgj26Ss2m49vX5jp8LzaM/sendMessage'
export const TELEGRAM_API_URL_PROD = 'https://api.telegram.org/bot8026350498:AAGcyKMsrJyD0mGgj26Ss2m49vX5jp8LzaM/sendMessage'

// Полностью новые константы для отладки
export const DEBUG_BOT_TOKEN = '8026350498:AAGcyKMsrJyD0mGgj26Ss2m49vX5jp8LzaM'
export const DEBUG_CHAT_ID = '919481169'
export const DEBUG_URL_DEV = '/api/telegram/bot8026350498:AAGcyKMsrJyD0mGgj26Ss2m49vX5jp8LzaM/sendMessage'
export const DEBUG_URL_PROD = 'https://api.telegram.org/bot8026350498:AAGcyKMsrJyD0mGgj26Ss2m49vX5jp8LzaM/sendMessage'
