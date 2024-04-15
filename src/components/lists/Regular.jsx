import React from 'react'

const RegularList = ({item,sourceName,ItemComponents}) => {
    console.log({...{[sourceName]:item}},'sourceName',);

  return (
    <>
    {item.map((item,i)=><ItemComponents key={i} {...{[sourceName]:item}}/>)}
    </>
  )
}

export default RegularList