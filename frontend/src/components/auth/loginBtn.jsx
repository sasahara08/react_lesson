import React, { useState } from "react";

function LoginButton({ type, content }) {

    return (
    <button type={type}>
        {content}
    </button>
    )
}

export default LoginButton;