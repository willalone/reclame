import React, { useState } from 'react'
import Quiz from './components/Quiz'

function App() {
  const [currentStep, setCurrentStep] = useState('start')

  return (
    <div className="App">
      {currentStep === 'start' && (
        <div className="start-screen">
          <div className="start-content">
            <div className="start-left">
              <img src="./background-first.webp" alt="Жилой комплекс Самолет МКР" className="start-image" />
            </div>
            <div className="start-right">
              <div className="start-header">
                <div className="start-logo">DOGMA</div>
                <div className="start-subtitle">Официальный сайт застройщика</div>
              </div>
              
              <h1 className="start-title">
                МКР «Самолёт» – Самый масштабный проект России
              </h1>
              
              <div className="start-features">
                <div className="start-feature">✓ Квартиры от 3,6 млн руб</div>
                <div className="start-feature">✓ Ипотечные каникулы с выгодой до 700 000 Р</div>
                <div className="start-feature">✓ 10 детских садов и 4 школы</div>
                <div className="start-feature">✓ Зоны отдыха в экостиле</div>
              </div>
              
              <button 
                className="start-button"
                onClick={() => setCurrentStep('quiz')}
              >
                Подобрать квартиру
              </button>
              
              <div className="start-footer">
                <div className="start-phone">+7(988)470-78-93</div>
                <div className="start-brand">DOGMA</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {currentStep === 'quiz' && (
        <Quiz onComplete={() => setCurrentStep('start')} />
      )}
    </div>
  )
}

export default App
