import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact__content">
          <div className="contact__info">
            <h2 className="contact__title">Свяжитесь с нами</h2>
            <p className="contact__description">
              Получите консультацию по вопросам покупки квартиры в жилом комплексе «Самолет МКР»
            </p>
            
            <div className="contact__details">
              <div className="contact__item">
                <div className="contact__icon">📞</div>
                <div className="contact__text">
                  <strong>Телефон</strong><br />
                  +7 (800) 123-45-67
                </div>
              </div>
              <div className="contact__item">
                <div className="contact__icon">✉️</div>
                <div className="contact__text">
                  <strong>Email</strong><br />
                  info@samolet-mkr.ru
                </div>
              </div>
              <div className="contact__item">
                <div className="contact__icon">📍</div>
                <div className="contact__text">
                  <strong>Адрес</strong><br />
                  г. Краснодар, ул. Примерная, 123
                </div>
              </div>
              <div className="contact__item">
                <div className="contact__icon">🕒</div>
                <div className="contact__text">
                  <strong>Часы работы</strong><br />
                  Пн-Вс: 9:00 - 21:00
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact__form">
            <form onSubmit={handleSubmit} className="form">
              <div className="form__header">
                <h3 className="form__title">Оставить заявку</h3>
                <p className="form__subtitle">Мы свяжемся с вами в течение 15 минут</p>
              </div>
              
              <div className="form__group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form__input"
                  placeholder="Ваше имя"
                  required
                />
              </div>
              
              <div className="form__group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form__input"
                  placeholder="+7 (___) ___-__-__"
                  required
                />
              </div>
              
              <div className="form__group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form__input"
                  placeholder="Email"
                />
              </div>
              
              <div className="form__group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form__textarea"
                  placeholder="Ваше сообщение"
                  rows="4"
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn--primary btn--full">
                Отправить заявку
              </button>
              
              <p className="form__privacy">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
