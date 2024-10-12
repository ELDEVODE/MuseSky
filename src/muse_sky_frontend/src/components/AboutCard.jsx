import React from 'react'

const AboutCard = ({ imageSrc, title, description }) => {
  return (
    <div className="flex flex-col md:flex-row items-center px-4">
      <img className="w-full md:w-[280px] h-[240px] md:h-[360px] object-cover rounded-[10px] mb-4 md:mb-0" src={imageSrc} alt={title} />
      <div className="md:grow md:shrink md:basis-0 px-0 md:px-12 py-4 md:py-6 flex flex-col justify-start items-start gap-3">
        <div className="text-white text-2xl md:text-3xl font-bold font-onest capitalize">{title}</div>
        <div className="text-white text-sm font-normal font-onest">{description}</div>
      </div>
    </div>
  )
}

export default AboutCard