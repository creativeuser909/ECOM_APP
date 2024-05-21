import React from 'react'
import { useParams } from 'react-router-dom';

const CategroyProducts = () => {
    const {categoryName} = useParams();
    console.log(categoryName);
  return (
    <div className="flex-grow w-full">
      <div className='h-full w-full bg-red-400'>
        <h1>{categoryName}</h1>
      </div>
    </div>
  )
}

export default CategroyProducts