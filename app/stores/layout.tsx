export const metadata = {
    title: 'Inicio',
    description: 'Generar reporte por store y fecha',
    icons: 'favicon.ico'
}

export default function StoreLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
