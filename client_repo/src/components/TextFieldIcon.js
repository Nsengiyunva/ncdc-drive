import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa'

import { at } from 'lodash'
import { useField } from 'formik'


const TextFieldIcon = ( { max, required = false, noPadding = false, disabled =  false, question = "", name, iconComponent, type =  "text", label, handleChange, handleBlur, value } ) => {
  const [ passwordVisibility, setPasswordVisible ] = useState( false )
  const [ field, meta ] = useField( name || "" )

  const _renderText = () => {
    const [ touched, error ] = at( meta, 'touched', 'error' ) 
    if( touched && error )
      return error
    
  }

  return (
    <div className={"flex flex-col items-start my-2"}>
      <div className="text-black text-xs md:text-base lg:text-base py-2">
        {question}{ required && ( <span className="text-red-500">*</span>) }
      </div>
      <div className={"inline-flex w-full border border-red-500 relative"}>
        <input 
          max={ type === "date" && max}
          name={name}
          disabled={disabled}
          id={name}
          type={type === "password" ? ( passwordVisibility ? "text" : "password" ) : type } 
          placeholder={label}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          required={required}
          autoComplete="off"
          style={{ backgroundColor: disabled ? "#DDD" : "#FFF" }}
          className={`${ ( meta.touched && meta.error ) ? "w-full px-3 py-1 focus:outline-none focus:text-gray-600 placeholder-red-500 text-xs md:text-base lg:text-base" :  "w-full px-3 py-1 focus:outline-none focus:text-gray-700 placeholder-gray-400 border border-gray-400 text-xs md:text-base lg:text-base"}`}
        />
        {type === "password" && 
        <div onClick={() => setPasswordVisible( !passwordVisibility )} className="cursor-pointer w-12 h-8 absolute top-0 right-0 flex items-center justify-center">
          {<FaEye size={16} color={`blue`} />}
        </div>}
      </div>
      
    {(meta.touched && meta.error) ? (
      <p className="text-red-500 py-1 text-xs">
        {_renderText()}
      </p>
    ) : (
      <p className="text-gray-700 text-xs">
        {/* {question}{ required && ( <span className="text-red-500">*</span>) } */}
      </p>
    ) }
    </div>
  )
}

export default TextFieldIcon
