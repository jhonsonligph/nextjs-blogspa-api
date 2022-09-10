import { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import moment from 'moment'
import { SLIDER_QUERY } from '../util/graphql'

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { loading, error, data } = useQuery(SLIDER_QUERY, { variables: { limit: 3 } })

  if (loading) return <span>...</span>
  if (error) return <span>Something went wrong</span>

  const { posts: slides } = data

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = slideIndex => {
    setCurrentIndex(slideIndex)
  }

  const hero_image = slides[currentIndex].image
  const no_image = 'https://dummyimage.com/1280x720/d6d6d6/fff.jpg&text=Error+404'
  const check_image = hero_image !== null && hero_image !== undefined ? hero_image : no_image

  return (
    <>
      <div className="carousel">
        <div className="slide" style={{ backgroundImage: `url(${check_image})` }}>
          <div className="slide-info-inner l-container">
            <h2 className="slide-title">
              <mark>{slides[currentIndex].title}</mark>
            </h2>
            <span className="slide-date">{moment(slides[currentIndex].createdAt).format("YYYY[.]MM[.]DD")}</span>
          </div>
        </div>
        <div className="carousel-control">
          <button className="carousel-control-button carousel-control-prev" onClick={prevSlide}></button>
          <button className="carousel-control-button carousel-control-next" onClick={nextSlide}></button>
        </div>
        <div className="carousel-pagination">
          {slides?.map((_, slideIndex) => (
            <button className={currentIndex === slideIndex ? 'active' : ''} key={slideIndex} onClick={() => goToSlide(slideIndex)}></button>
          ))}
        </div>
      </div>
    </>
  );
}

export default ImageSlider