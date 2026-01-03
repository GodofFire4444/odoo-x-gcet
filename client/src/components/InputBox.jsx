import React from 'react'

const InputBox = ({ placeholder, type = "text", value, onChange }) => (
    <input 
      type={type} 
      placeholder={placeholder} 
      value={value}
      onChange={onChange}
    />
);

export default InputBox;
