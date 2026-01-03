import React from 'react'

const Button = ({ text, type = "button" }) => (
                <button type={type}>{text}</button>
               );

export default Button;
