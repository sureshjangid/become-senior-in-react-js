import React, { useState } from 'react'
import styled from 'styled-components'


const ModalBackground = styled.div({
    position:'absolute',
    left:0,
    top:0,
    overflow:'auto',
    backgroundColor:'#00000067',
    width:'100%',
    height:"100%",
})

const ModalContent = styled.div({
    margin:'12px auto',
    padding:'24px',
    backgroundColor:"wheat",
    width:"50%"
})
const Modal = ({children}) => {
    const [show,setShow] = useState(false)
  return (
    <>
    <button onClick={()=>setShow(true)}>Open Modal</button>
    {show && 
    
    <ModalBackground onClick={()=>setShow(false)}>
        <ModalContent onClick={(e)=>e.stopPropagation()}>
            <button onClick={()=>setShow(false)}>Close</button>
            {children}
        </ModalContent>

    </ModalBackground>
    }
    </>
  )
}

export default Modal