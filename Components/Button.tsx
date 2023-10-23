import React from 'react'
import {ButtonProps} from '../types'

const Button = ({text, btnType, containerStyles, handleClick, textStyles}:ButtonProps) => {
  return (
    <div>
        <button disabled={false} className={`custom-btn ${containerStyles}`} type={btnType || "button"} 
        onClick={handleClick}>

            <span className= {`flex-1 ${textStyles}`}>
            {text}
            </span>

        </button>

    </div>
  )
}

export default Button