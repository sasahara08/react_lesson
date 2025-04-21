import React, { useState } from "react";

function FormButton({ type, content }) {

    return (
    <button type={type}>
        {content}
    </button>
    )
}

export default FormButton;