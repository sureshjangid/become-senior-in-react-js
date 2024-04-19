import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ResourceURL = ({resoureURL,resouceName ,children}) => {
    const [resource,setResource] = useState(null);

    
    useEffect(()=>{
        (async ()=>{
            const res = await axios.get(`https://jsonplaceholder.typicode.com/${resoureURL}`)
            setResource(res?.data)
        })();
    },[])

  return (
    <>
    {React.Children?.map(children,(child)=>{
        if(React.isValidElement(child)){
             return React.cloneElement(child,{[resouceName]:resource})
        }
        return child;

    })}
    </>
  )
}

export default ResourceURL