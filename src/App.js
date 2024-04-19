import { useState } from 'react';
import './App.css';
import MappingData from './components/Mapping-data';
import ResourceURL from './components/resource-loader';
import ResourceLoaderWithRender from './components/resource-loader-with-render';
function App() {
  const [tab,setTab] = useState(0);
  return (
    <>
    <button onClick={()=>setTab(0)}>User Data</button>
    <button onClick={()=>setTab(1)}>Post Data</button>

{/* {tab==0 && 
    <ResourceURL resouceName={'data'} resoureURL={'users'}>
      <MappingData/>
    </ResourceURL>
    }

{tab==1 && 
    <ResourceURL resouceName={'data'} resoureURL={'posts'}>
      <MappingData/>
    </ResourceURL>
    } */}

{tab==0 && 
    <ResourceLoaderWithRender resoureURL={'users'} render={(resource)=> <MappingData data={resource}/>}/>
    }

{tab==1 && 
        <ResourceLoaderWithRender resoureURL={'posts'} render={(resource)=><MappingData data={resource}/>}/>

    } 

    
    </>
  );
}

export default App;
