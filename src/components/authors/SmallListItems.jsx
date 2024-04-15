import React from 'react'

const SmallListItems = ({ authors}) => {
    const { name, age } = authors
    return (
        <p>Name:{name},Age:{age}</p>
    )
}

export default SmallListItems