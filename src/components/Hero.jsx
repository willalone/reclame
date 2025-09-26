import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__overlay"></div>
        <div className="hero__image">
          <img src="/hero-bg.jpg" alt="Жилой комплекс Самолет МКР" />
        </div>
      </div>
      
      <div className="container">
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__title">
              Жилой комплекс <br />
              <span className="hero__title--accent">Самолет МКР</span>
            </h1>
            <p className="hero__subtitle">
              Современные квартиры в Краснодаре с развитой инфраструктурой
            </p>
            <div className="hero__features">
              <div className="hero__feature">
                <span className="hero__feature-icon">🏠</span>
                <span>От 1-комнатных до 4-комнатных</span>
              </div>
              <div className="hero__feature">
                <span className="hero__feature-icon">📍</span>
                <span>Центральный район Краснодара</span>
              </div>
              <div className="hero__feature">
                <span className="hero__feature-icon">🏢</span>
                <span>Современная инфраструктура</span>
              </div>
            </div>
          </div>
          
          <div className="hero__form">
            <div className="form__header">
              <h3 className="form__title">Узнать цену и условия</h3>
              <p className="form__subtitle">Получите персональное предложение</p>
            </div>
            
            <form className="form">
              <div className="form__group">
                <input 
                  type="text" 
                  className="form__input" 
                  placeholder="Ваше имя"
                  required
                />
              </div>
              <div className="form__group">
                <input 
                  type="tel" 
                  className="form__input" 
                  placeholder="+7 (___) ___-__-__"
                  required
                />
              </div>
              <div className="form__group">
                <select className="form__select">
                  <option value="">Тип квартиры</option>
                  <option value="1">1-комнатная</option>
                  <option value="2">2-комнатная</option>
                  <option value="3">3-комнатная</option>
                  <option value="4">4-комнатная</option>
                </select>
              </div>
              <button type="submit" className="btn btn--primary btn--full">
                Получить предложение
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

export default Hero
