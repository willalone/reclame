import React, { useState, useEffect } from 'react'
// Telegram configuration - используем прямые значения для избежания проблем с URL-кодированием

const Quiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '' })
  const [autoTransitionTimeout, setAutoTransitionTimeout] = useState(null)

  // Очищаем таймаут при размонтировании компонента
  useEffect(() => {
    return () => {
      if (autoTransitionTimeout) {
        clearTimeout(autoTransitionTimeout)
      }
    }
  }, [autoTransitionTimeout])

  const questions = [
    {
      id: 1,
      question: "Какое количество комнат вы рассматриваете?",
      options: [
        { value: "studio", label: "Студия", image: "./question1.png" },
        { value: "1room", label: "1-комнатная", image: "./question1.png" },
        { value: "2room", label: "2-комнатная", image: "./question1.png" },
        { value: "3room", label: "3-комнатная", image: "./question1.png" }
      ]
    },
    {
      id: 2,
      question: "Какой вариант отделки вы рассматриваете?",
      options: [
        { value: "prefinish", label: "Предчистовая", image: "./question2.png" },
        { value: "renovated", label: "С ремонтом", image: "./question2.png" },
        { value: "different", label: "Рассматриваю разные варианты", image: "./question2.png" }
      ]
    },
    {
      id: 3,
      question: "Какой способ покупки квартиры вы рассматриваете?",
      options: [
        { value: "mortgage", label: "Ипотека", image: "./question3.png" },
        { value: "state_mortgage", label: "Ипотека с гос. поддержкой", image: "./question3.png" },
        { value: "installment", label: "Рассрочка", image: "./question3.png" },
        { value: "cash", label: "Наличный расчет", image: "./question3.png" },
        { value: "different", label: "Рассматриваю разные способы оплаты", image: "./question3.png" }
      ]
    }
  ]

  const progress = Math.round((currentQuestion / questions.length) * 100)

  const handleAnswerSelect = (answer) => {
    // Очищаем предыдущий таймаут если он есть
    if (autoTransitionTimeout) {
      clearTimeout(autoTransitionTimeout)
    }
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }))
    
    // Устанавливаем новый таймаут для автоматического перехода через 1.5 секунды
    const timeout = setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        setShowForm(true)
      }
    }, 1500)
    
    setAutoTransitionTimeout(timeout)
  }

  const handleNext = () => {
    // Отменяем автоматический переход
    if (autoTransitionTimeout) {
      clearTimeout(autoTransitionTimeout)
      setAutoTransitionTimeout(null)
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowForm(true)
    }
  }

  const handlePrev = () => {
    // Отменяем автоматический переход
    if (autoTransitionTimeout) {
      clearTimeout(autoTransitionTimeout)
      setAutoTransitionTimeout(null)
    }
    
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    console.log('🚀 Начинаем обработку формы...')
    
    const results = {
      answers: selectedAnswers,
      name: formData.name,
      phone: formData.phone,
      timestamp: new Date().toISOString()
    }

    console.log('📊 Данные для отправки:', results)

    try {
      // Формируем ответы для отправки
      const formattedAnswers = Object.entries(results.answers).map(([key, value]) => {
        const questionIndex = parseInt(key)
        const question = questions[questionIndex]
        const option = question?.options.find(opt => opt.value === value)
        return {
          question: question?.question || `Вопрос ${questionIndex + 1}`,
          answer: option?.label || value
        }
      })

      // Пытаемся отправить через iframe (обход CORS)
      try {
        const message = `🏠 Новая заявка с квиза "Самолет МКР"

👤 Имя: ${results.name}
📞 Телефон: ${results.phone}

📝 Ответы на вопросы:
${formattedAnswers.map(item => `• ${item.question}: ${item.answer}`).join('\n')}

⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

        // Отправка в Telegram бот
        try {
          const BOT_TOKEN = '8026350498:AAGcyKMsrJyD0mGgj26Ss2m49vX5jp8LzaM'
          const CHAT_ID = '919481169'
          const isDev = import.meta.env.DEV
          
          // Формируем URL напрямую без template literals
          let apiUrl
          if (isDev) {
            apiUrl = '/api/telegram/bot' + BOT_TOKEN + '/sendMessage'
          } else {
            apiUrl = 'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage'
          }
          
          console.log('🔗 URL:', apiUrl)
          console.log('📝 Сообщение:', message)
          
          const response = await fetch(apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: CHAT_ID,
              text: message,
              parse_mode: 'HTML'
            })
          });
          
          console.log('📡 Статус:', response.status, response.statusText)

          if (response.ok) {
            const result = await response.json()
            console.log('✅ Успешно отправлено:', result)
            alert('✅ Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.')
            return
          } else {
            const errorText = await response.text()
            console.error('❌ Ошибка API:', response.status, errorText)
            throw new Error(`API Error: ${response.status} - ${errorText}`)
          }
        } catch (telegramError) {
          console.log('Telegram API не работает, пробуем iframe:', telegramError);
        }

        // Резервный способ: iframe (если основной не сработал)
        try {
          const params = new URLSearchParams({
            name: results.name,
            phone: results.phone,
            answers: JSON.stringify(formattedAnswers)
          });

          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = `/telegram-sender.html?${params.toString()}`;
          document.body.appendChild(iframe);

          const handleMessage = (event) => {
            if (event.data.success) {
              console.log('✅ Отправлено через iframe:', event.data.message);
              alert('✅ Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
              document.body.removeChild(iframe);
              window.removeEventListener('message', handleMessage);
              return;
            }
          };

          window.addEventListener('message', handleMessage);

          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
              window.removeEventListener('message', handleMessage);
            }
          }, 5000);
        } catch (iframeError) {
          console.log('Iframe не работает:', iframeError);
        }

      } catch (telegramError) {
        console.log('⚠️ Все способы отправки не сработали, используем локальное сохранение:', telegramError)
      }

      // Если сервер недоступен, сохраняем локально и показываем модальное окно
      const messageText = `🏠 Новая заявка с квиза "Самолет МКР"

👤 Имя: ${results.name}
📞 Телефон: ${results.phone}

📝 Ответы на вопросы:
${formattedAnswers.map(item => `• ${item.question}: ${item.answer}`).join('\n')}

⏰ Время: ${new Date().toLocaleString('ru-RU')}`

      const savedApplications = JSON.parse(localStorage.getItem('quizApplications') || '[]')
      savedApplications.push({
        ...results,
        messageText,
        timestamp: new Date().toISOString()
      })
      localStorage.setItem('quizApplications', JSON.stringify(savedApplications))

      console.log('📝 Создаем модальное окно...')
      
      const modal = document.createElement('div')
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.8); z-index: 10000; display: flex; 
        align-items: center; justify-content: center;
      `
      modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 12px; max-width: 600px; max-height: 80vh; overflow-y: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <h2 style="margin: 0 0 20px 0; color: #333;">📋 Данные заявки</h2>
          <p style="margin: 0 0 15px 0; color: #666;">Скопируйте данные и отправьте в Telegram бот:</p>
          <textarea readonly style="width: 100%; height: 300px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; font-family: monospace; font-size: 14px; resize: vertical;">${messageText}</textarea>
          <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button onclick="navigator.clipboard.writeText(this.parentElement.previousElementSibling.value); alert('✅ Скопировано!')" style="background: #007bff; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px;">📋 Скопировать</button>
            <button onclick="window.open('https://t.me/your_bot_username', '_blank')" style="background: #0088cc; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px;">📱 Открыть Telegram</button>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px;">❌ Закрыть</button>
          </div>
          <p style="margin: 15px 0 0 0; font-size: 14px; color: #666;">💡 Данные также сохранены в браузере</p>
        </div>
      `
      document.body.appendChild(modal)
      console.log('✅ Модальное окно добавлено в DOM')

      try {
        navigator.clipboard.writeText(messageText).then(() => {
          console.log('Данные скопированы в буфер обмена')
        }).catch(e => {
          console.log('Не удалось скопировать автоматически:', e)
        })
      } catch (e) {
        console.log('Не удалось скопировать автоматически:', e)
      }

    } catch (error) {
      console.error('Детальная ошибка:', error)
      console.error('Стек ошибки:', error.stack)
      alert(`❌ Произошла ошибка: ${error.message}\n\nПроверьте консоль браузера (F12) для подробностей.`)
    }
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length === 0) return ''
    if (numbers.length <= 1) return `+7(${numbers}`
    if (numbers.length <= 4) return `+7(${numbers.slice(1)}`
    if (numbers.length <= 7) return `+7(${numbers.slice(1, 4)})${numbers.slice(4)}`
    if (numbers.length <= 9) return `+7(${numbers.slice(1, 4)})${numbers.slice(4, 7)}-${numbers.slice(7)}`
    return `+7(${numbers.slice(1, 4)})${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhone(value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <div className="quiz-container">
      <div className="quiz-banner">
        <div className="quiz-banner-content">
          <div className="quiz-banner-left">
            <div className="quiz-banner-title">Подберите квартиру</div>
            <div className="quiz-banner-subtitle">Ответьте на несколько вопросов и получите персональную подборку</div>
          </div>
          <div className="quiz-banner-right">
            <div className="quiz-banner-phone">+7(988)470-78-93</div>
          </div>
        </div>
      </div>
      
      {showForm ? (
        <div className="quiz-content final-page">
          <div className="quiz-left">
            <h2 className="quiz-question">Получите персональную подборку квартир, заполнив форму</h2>
            
            <div className="quiz-features">
              <p>В Микрорайоне «Самолёт» от DOGMA есть все для комфортной жизни:</p>
              <ul>
                <li>Амфитеатр под открытым небом на бульваре</li>
                <li>Видеонаблюдение и круглосуточный пост охраны</li>
                <li>11 павильонов фудкорта</li>
                <li>Собственный пешеходный бульвар 1,6 км</li>
                <li>9 остановок городского транспорта</li>
                <li>Зоны барбекю зоны с теневым навесами</li>
                <li>Дороги-дублёры</li>
              </ul>
            </div>
            
            <form onSubmit={handleFormSubmit} className="quiz-form">
              <div className="form-group">
                <label htmlFor="name">ВВЕДИТЕ ИМЯ</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">ВВЕДИТЕ ТЕЛЕФОН</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+7(___)___-__-__"
                  required
                />
              </div>
              
              <button type="submit" className="submit-button">
                Получить результаты
              </button>
              
              <div className="quiz-form-footer">
                <label className="form-checkbox">
                  <input type="checkbox" required />
                  Я соглашаюсь на обработку персональных данных согласно политике конфиденциальности
                </label>
              </div>
            </form>
          </div>
          
          <div className="quiz-right">
            <div className="question-image">
              <img src="./background-last.png" alt="Жилой комплекс" />
            </div>
          </div>
        </div>
      ) : (
        <div className={`quiz-content ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          <div className="quiz-left">
            <h2 className="quiz-question">{questions[currentQuestion].question}</h2>
            
            <div className="quiz-options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${selectedAnswers[currentQuestion] === option.value ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(option.value)}
                >
                  <div className="option-radio">
                    <div className="radio-circle"></div>
                  </div>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="quiz-right">
            <div className="question-image">
              <img src={questions[currentQuestion].options[0].image} alt="Вопрос" />
            </div>
          </div>
        </div>
      )}
      
      <div className="quiz-footer">
        <div className="progress-info">
          <span>Вопрос {currentQuestion + 1} из {questions.length}</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        
        <div className="quiz-navigation">
          <button 
            className="nav-button prev" 
            onClick={handlePrev}
            disabled={currentQuestion === 0}
          >
            ← Назад
          </button>
          <button 
            className="nav-button next" 
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
          >
            Далее →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quiz
