import React from 'react'
import './Features.css'

const Features = () => {
  const features = [
    {
      icon: '🏢',
      title: 'Современная архитектура',
      description: 'Стильный дизайн и качественные материалы'
    },
    {
      icon: '🌳',
      title: 'Озелененная территория',
      description: 'Благоустроенные дворы и зоны отдыха'
    },
    {
      icon: '🚗',
      title: 'Подземный паркинг',
      description: 'Удобная парковка для всех жителей'
    },
    {
      icon: '🏪',
      title: 'Коммерческие помещения',
      description: 'Магазины и сервисы на первом этаже'
    },
    {
      icon: '🏃',
      title: 'Спортивные площадки',
      description: 'Фитнес-залы и спортивные зоны'
    },
    {
      icon: '👶',
      title: 'Детские площадки',
      description: 'Безопасные игровые зоны для детей'
    }
  ]

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="features__header">
          <h2 className="features__title">Преимущества комплекса</h2>
          <p className="features__subtitle">
            Все для комфортной жизни в центре Краснодара
          </p>
        </div>
        
        <div className="features__grid">
          {features.map((feature, index) => (
            <div key={index} className="feature__card">
              <div className="feature__icon">
                {feature.icon}
              </div>
              <h3 className="feature__title">{feature.title}</h3>
              <p className="feature__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
