import React from 'react'

const AboutCard = ({ imageSrc, title, description }) => {
  return (
    <div className="h-[360px] px-16 justify-start items-center inline-flex">
      <img className="w-[280px] h-[360px] relative rounded-[10px]" src={imageSrc} alt={title} />
      <div className="grow shrink basis-0 px-12 py-6 flex-col justify-start items-start gap-3 inline-flex">
        <div className="text-white text-3xl font-bold font-onest capitalize">{title}</div>
        <div className="self-stretch text-white text-sm font-normal font-onest">{description}</div>
      </div>
    </div>
  )
}

export default AboutCard