import React from 'react'
import AboutCard from './AboutCard'

const AboutStack = ({ className, cards }) => {
  return (
    <div className={`flex flex-col gap-[100px] py-[100px] ${className}`}>
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
