import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CurrentUserLoader = ({children}) => {
    const [user,setUser] = useState(null);

    const data = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",}

    ]
    useEffect(()=>{
        (async ()=>{
            const res = await axios.get('https://jsonplaceholder.typicode.com/users')
            setUser(res?.data)
        })();
    },[])

    console.log(user,'user')
  return (
    <>
    {React.Children?.map(children,(child)=>{
        if(React.isValidElement(child)){

            return React.cloneElement(child,{user})
        }
        return child;

    })}
    </>
  )
}

export default CurrentUserLoader