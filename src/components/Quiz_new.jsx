import React, { useState, useEffect } from 'react'
import './Quiz.css'

const Quiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '' })

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
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }))
    
    setIsTransitioning(true)
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        setShowForm(true)
      }
      setIsTransitioning(false)
    }, 3000)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowForm(true)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleFormSubmit = (e) => {
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
      const messageText = `🏠 Новая заявка с квиза "Самолет МКР"

👤 Имя: ${results.name}
📞 Телефон: ${results.phone}

📝 Ответы на вопросы:
${Object.entries(results.answers).map(([key, value]) => {
  const question = questions.find(q => q.id === parseInt(key))
  const option = question?.options.find(opt => opt.value === value)
  return `• ${question?.question}: ${option?.label || value}`
}).join('\n')}

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
            <div className="quiz-banner-phone">+7(861)206-03-90</div>
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
              <div className="quiz-form-group">
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
              
              <div className="quiz-form-group">
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
              
              <button type="submit" className="quiz-submit-button">
                Получить результаты
              </button>
              
              <div className="quiz-form-footer">
                <label className="quiz-checkbox">
                  <input type="checkbox" required />
                  <span className="quiz-checkbox-mark"></span>
                  Я соглашаюсь на обработку персональных данных согласно политике конфиденциальности
                </label>
              </div>
              
              <div className="quiz-right">
                <div className="question-image">
                  <img src="./background-last.png" alt="Жилой комплекс" />
                </div>
              </div>
            </form>
          </div>
          <div className="quiz-footer">
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
                  {option.label}
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
        <div className="quiz-progress">
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="quiz-progress-text">{progress}%</div>
        </div>
        
        <div className="quiz-navigation">
          <button 
            className="quiz-nav-button" 
            onClick={handlePrev}
            disabled={currentQuestion === 0}
          >
            ←
          </button>
          <button 
            className="quiz-nav-button" 
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quiz
