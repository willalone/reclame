import React from 'react'
import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about__content">
          <div className="about__text">
            <h2 className="about__title">О проекте</h2>
            <p className="about__description">
              Жилой комплекс «Самолет МКР» — это современный проект в самом сердце Краснодара. 
              Мы создали уникальное пространство для жизни, где комфорт и функциональность 
              сочетаются с продуманной архитектурой и развитой инфраструктурой.
            </p>
            <p className="about__description">
              Комплекс включает в себя несколько корпусов с квартирами различной планировки, 
              от уютных студий до просторных семейных квартир. Каждая квартира спроектирована 
              с учетом современных потребностей жителей.
            </p>
          </div>
          
          <div className="about__stats">
            <div className="stat">
              <div className="stat__number">15</div>
              <div className="stat__label">этажей</div>
            </div>
            <div className="stat">
              <div className="stat__number">500+</div>
              <div className="stat__label">квартир</div>
            </div>
            <div className="stat">
              <div className="stat__number">2024</div>
              <div className="stat__label">год сдачи</div>
            </div>
            <div className="stat">
              <div className="stat__number">95%</div>
              <div className="stat__label">готовность</div>
            </div>
          </div>
        </div>
        
        <div className="about__image">
          <img src="/about-image.jpg" alt="Жилой комплекс Самолет МКР" />
        </div>
      </div>
    </section>
  )
}

export default About
