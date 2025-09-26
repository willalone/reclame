import React, { useState } from 'react'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <img src="/logo.svg" alt="Самолет МКР" className="logo" />
            <span className="logo-text">Самолет МКР</span>
          </div>
          
          <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#about" className="nav__link">О проекте</a>
              </li>
              <li className="nav__item">
                <a href="#features" className="nav__link">Преимущества</a>
              </li>
              <li className="nav__item">
                <a href="#gallery" className="nav__link">Галерея</a>
              </li>
              <li className="nav__item">
                <a href="#location" className="nav__link">Расположение</a>
              </li>
              <li className="nav__item">
                <a href="#contact" className="nav__link">Контакты</a>
              </li>
            </ul>
          </nav>

          <div className="header__actions">
            <a href="tel:+78001234567" className="header__phone">
              +7 (800) 123-45-67
            </a>
            <button className="btn btn--primary header__cta">
              Заказать звонок
            </button>
          </div>

          <button 
            className={`header__burger ${isMenuOpen ? 'header__burger--open' : ''}`}
            onClick={toggleMenu}
            aria-label="Открыть меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
