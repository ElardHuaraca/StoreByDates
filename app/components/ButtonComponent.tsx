'use client'

import React from "react"

interface ButtonReportProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    textButton: string | JSX.Element
}

const ButtonReport: React.FC<ButtonReportProps> = ({ textButton, ...props }) => {
    return (
        <button {...props} onClick={() => { console.log('Generar reporte') }} >
            <span>{textButton}</span>
        </button>
    )
}

export { ButtonReport }