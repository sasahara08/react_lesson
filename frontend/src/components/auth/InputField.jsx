import React from "react";

function InputField({ type, value, name, label, placeholder, onChange }) {
    return (
        <>
            <label htmlFor={label}>{label}</label>
            <input type={type} id={label} name={name} value={value} placeholder={placeholder} onChange={onChange}/>
        </>
    )
}

export default LoginInput;