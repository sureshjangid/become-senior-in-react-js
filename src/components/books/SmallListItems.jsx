import React from 'react'

const SmallListItems = ({books}) => {
    const {name,price} = books
  return (
    <>
    <h2>Name:{name}</h2>
    <p>Price:{price}</p>
    </>
  )
}

export default SmallListItems