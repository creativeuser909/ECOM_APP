import React from 'react'
import { useParams } from 'react-router-dom';

const CategroyProducts = () => {
    const {categoryName} = useParams();
    console.log(categoryName);
  return (
    <div>{categoryName}</div>
  )
}

export default CategroyProducts