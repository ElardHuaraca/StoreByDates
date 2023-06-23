'use client'

export default function ButtonReport({ textButton, className }: { textButton: string, className: string }) {
    return (
        <button className={className} onClick={() => { console.log('Generar reporte') }}>
            <span>{textButton}</span>
        </button>
    )
}