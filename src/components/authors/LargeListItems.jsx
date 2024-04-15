import React from 'react'

const LargeListItems = ({ authors }) => {
    const { name, age, books, nationality } = authors;
    return (
        <>
            <h2 >Name:{name}</h2>
            <p>Age:{age}</p>
            <p>Nationality:{nationality}</p>
            <h3>Books</h3>
            <ul>
                {books?.map(book=><li key={book}>{book}</li>)}
            </ul>

        </>
    )
}

export default LargeListItems