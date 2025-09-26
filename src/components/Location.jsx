import React from 'react'
import './Location.css'

const Location = () => {
  return (
    <section id="location" className="location">
      <div className="container">
        <div className="location__content">
          <div className="location__info">
            <h2 className="location__title">Расположение</h2>
            <p className="location__description">
              Жилой комплекс «Самолет МКР» расположен в самом центре Краснодара, 
              в окружении развитой инфраструктуры и зеленых зон.
            </p>
            
            <div className="location__features">
              <div className="location__feature">
                <div className="location__feature-icon">🚇</div>
                <div className="location__feature-text">
                  <strong>5 минут</strong> до метро
                </div>
              </div>
              <div className="location__feature">
                <div className="location__feature-icon">🏥</div>
                <div className="location__feature-text">
                  <strong>3 минуты</strong> до больницы
                </div>
              </div>
              <div className="location__feature">
                <div className="location__feature-icon">🏫</div>
                <div className="location__feature-text">
                  <strong>7 минут</strong> до школы
                </div>
              </div>
              <div className="location__feature">
                <div className="location__feature-icon">🛒</div>
                <div className="location__feature-text">
                  <strong>2 минуты</strong> до торгового центра
                </div>
              </div>
            </div>
          </div>
          
          <div className="location__map">
            <div className="map__container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2818.123456789!2d38.987654321!3d45.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDA3JzI0LjQiTiAzOMKwNTknMTUuNiJF!5e0!3m2!1sru!2sru!4v1234567890123!5m2!1sru!2sru"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта расположения"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Location
