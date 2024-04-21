import React, { forwardRef } from 'react'

const CustomInput = (props,ref) => {
  return (
    <>
    <input  ref={ref} {...props} placeholder='Enter a value'/>
    </>
  )
}

export const Input = forwardRef(CustomInput)