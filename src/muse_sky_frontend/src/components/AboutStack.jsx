import React from 'react'
import AboutCard from './AboutCard'

const AboutStack = ({ className, cards }) => {
  return (
    <div className={`flex flex-col gap-12 md:gap-[100px] py-12 md:py-[100px] ${className}`}>
      {cards.map((card, index) => (
        <AboutCard
          key={index}
          imageSrc={card.imageSrc}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  )
}

export default AboutStack
