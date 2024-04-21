import { useRef, useState } from 'react';
import './App.css';
import {Input} from './components/input';

function App() {
  const inputRef= useRef();

  const handleClick  =()=>{
    console.log(inputRef.current.value);
  }
 
  return (
    <>
    <Input ref={inputRef}/>
    <button onClick={()=>handleClick()}>submit</button>
    </>
  );
}



export default App;
