import React from 'react'
import { MdCancel } from "react-icons/md";

const ReturnImageDiv = ({image}) => {
    console.log(image)
  return (
    <div className='w-[120px] h-[120px] rounded relative'>
        <img src={image} alt="" className='w-full h-full object-cover rounded'/>
        <MdCancel className='cursor-pointer text-2xl absolute top-0 right-0' onClick={()=>{}}/>
    </div>
  )
}

export default ReturnImageDiv