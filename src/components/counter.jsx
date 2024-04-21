import React, { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);
    if(count>5){
        throw new Error('count is more then 10')
     }
  return (
    <div> <div className="counter">{count}</div>
    <button className="button" onClick={() => setCount(prev => prev + 1)}>
      Count +
    </button></div>
  )
}

export default Counter