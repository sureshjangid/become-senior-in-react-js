import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ResourceLoaderWithRender = ({resoureURL,render}) => {
    const [resource,setResource] = useState(null);

    console.log(render(),'renderrender');
    useEffect(()=>{
        (async ()=>{
            const res = await axios.get(`https://jsonplaceholder.typicode.com/${resoureURL}`)
            setResource(res?.data)
        })();
    },[])

  return render(resource)
}

export default ResourceLoaderWithRender