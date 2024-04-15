import React from 'react'

const LargeListItems = ({books}) => {
    const {name,price,pages,author} = books
  return (
    <>
    <h2>Name:{name}</h2>
    <p>Price:{price}</p>
    <p>Page:{pages}</p>
    <p>Author:{author}</p>

    </>
  )
}

export default LargeListItems