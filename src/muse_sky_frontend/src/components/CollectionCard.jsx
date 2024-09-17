import React from 'react'

const CollectionCard = ({ creatorName, collectionName, mainImage, sideImage1, sideImage2 }) => {
  return (
    <div className="h-[320px] px-3 py-4 bg-white/10 rounded-[10px] border border-[#ffa703] flex-col justify-start items-start gap-2 inline-flex">
      <div className="flex-col justify-start items-start gap-1 flex">
        <div className="w-[240px] text-[#b4c7ce] text-sm font-normal font-['Onest'] leading-tight">Created by</div>
        <div className="w-[240px] justify-start items-center gap-2 inline-flex">
          <img className="w-[18px] h-[18px] rounded-full" src="https://via.placeholder.com/18x18" alt="Creator avatar" />
          <div className="grow shrink basis-0 text-[#ffc252] text-lg font-semibold font-['Bricolage Grotesque'] truncate">{creatorName}</div>
        </div>
      </div>
      <div className="flex-col justify-start items-start gap-2 flex">
        <div className="justify-start items-start gap-2 inline-flex">
          <img className="w-[120px] h-[180px] rounded-[5px] object-cover" src={mainImage} alt="Main collection image" />
          <div className="flex-col justify-start items-start gap-2 inline-flex">
            <img className="w-[120px] h-[87px] rounded-[5px] object-cover" src={sideImage1} alt="Side image 1" />
            <img className="w-[120px] h-[87px] rounded-[5px] object-cover" src={sideImage2} alt="Side image 2" />
          </div>
        </div>
        <div className="flex-col justify-start items-start flex">
          <div className="w-[240px] text-white text-sm font-semibold font-['Bricolage Grotesque'] leading-tight truncate">{collectionName}</div>
        </div>
      </div>
    </div>
  )
}

export default CollectionCard