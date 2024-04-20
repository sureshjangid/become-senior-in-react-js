import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export const useCurrentUser = () => {
    const [user,setUser] = useState();
    useEffect(()=>{
(async()=>{
    const res = await axios.get('https://jsonplaceholder.typicode.com/users/1')
    setUser(res?.data);
})();
    },[])
    console.log(user,'user');
    return user;
}