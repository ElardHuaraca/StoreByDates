'use client'

import React from "react"

interface ButtonReportProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    textButton: string | JSX.Element
}

const ButtonComponent: React.FC<ButtonReportProps> = ({ textButton, ...props }) => {
    return (
        <button {...props} >
            <span>{textButton}</span>
        </button >
    )
}

export { ButtonComponent }