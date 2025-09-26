import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <div className="footer__logo">
              <img src="/logo.svg" alt="Самолет МКР" className="logo" />
              <span className="logo-text">Самолет МКР</span>
            </div>
            <p className="footer__description">
              Современный жилой комплекс в центре Краснодара с развитой инфраструктурой 
              и комфортными условиями для жизни.
            </p>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__title">Навигация</h4>
            <ul className="footer__list">
              <li><a href="#about" className="footer__link">О проекте</a></li>
              <li><a href="#features" className="footer__link">Преимущества</a></li>
              <li><a href="#gallery" className="footer__link">Галерея</a></li>
              <li><a href="#location" className="footer__link">Расположение</a></li>
              <li><a href="#contact" className="footer__link">Контакты</a></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__title">Контакты</h4>
            <div className="footer__contacts">
              <div className="footer__contact">
                <span className="footer__contact-icon">📞</span>
                <span>+7 (800) 123-45-67</span>
              </div>
              <div className="footer__contact">
                <span className="footer__contact-icon">✉️</span>
                <span>info@samolet-mkr.ru</span>
              </div>
              <div className="footer__contact">
                <span className="footer__contact-icon">📍</span>
                <span>г. Краснодар, ул. Примерная, 123</span>
              </div>
            </div>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__title">Социальные сети</h4>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="ВКонтакте">
                <span>VK</span>
              </a>
              <a href="#" className="footer__social-link" aria-label="Telegram">
                <span>TG</span>
              </a>
              <a href="#" className="footer__social-link" aria-label="WhatsApp">
                <span>WA</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <div className="footer__copyright">
            <p>&copy; 2024 Самолет МКР. Все права защищены.</p>
          </div>
          <div className="footer__legal">
            <a href="#" className="footer__legal-link">Политика конфиденциальности</a>
            <a href="#" className="footer__legal-link">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
