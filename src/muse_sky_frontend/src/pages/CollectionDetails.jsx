import React from 'react'
import DisplayCard from '../components/DisplayCard'
import { Rectangle25 } from '../assets/images'


const CollectionDetails = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center py-20'>
        <DisplayCard imageUrl={Rectangle25} />
      </div>


    </>
  )
}

export default CollectionDetails