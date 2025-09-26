import React, { useState } from 'react'
import './Gallery.css'

const Gallery = () => {
  const [activeImage, setActiveImage] = useState(0)
  
  const images = [
    '/gallery-1.jpg',
    '/gallery-2.jpg',
    '/gallery-3.jpg',
    '/gallery-4.jpg',
    '/gallery-5.jpg',
    '/gallery-6.jpg'
  ]

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="gallery__header">
          <h2 className="gallery__title">Галерея</h2>
          <p className="gallery__subtitle">
            Посмотрите, как выглядит ваш будущий дом
          </p>
        </div>
        
        <div className="gallery__content">
          <div className="gallery__main">
            <img 
              src={images[activeImage]} 
              alt={`Галерея ${activeImage + 1}`}
              className="gallery__main-image"
            />
            <div className="gallery__controls">
              <button 
                className="gallery__btn gallery__btn--prev"
                onClick={() => setActiveImage(activeImage > 0 ? activeImage - 1 : images.length - 1)}
              >
                ‹
              </button>
              <button 
                className="gallery__btn gallery__btn--next"
                onClick={() => setActiveImage(activeImage < images.length - 1 ? activeImage + 1 : 0)}
              >
                ›
              </button>
            </div>
          </div>
          
          <div className="gallery__thumbnails">
            {images.map((image, index) => (
              <div 
                key={index}
                className={`gallery__thumbnail ${activeImage === index ? 'gallery__thumbnail--active' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={image} alt={`Миниатюра ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery
