'use client'

import { ButtonComponent } from "./ButtonComponent"

export default function ButtonDownloadFile() {
    const downloadFile = async () => {
        const response = fetch('/api/download')
            .then(async (res) => {
                if (res.ok) return res.blob()
                else return "El reporte aun no se ha generado"
            }).catch(e => {
                console.log(e)
                return "Ocurrio un error al intentar descargar el archivo"
            })

        const blob = await response
        if (typeof blob === "string") return alert(blob)

        const file = URL.createObjectURL(blob)
        location.assign(file)

    }

    return <ButtonComponent textButton="Descargar reporte" onClick={downloadFile} id="download_file"
        className="w-auto p-2 bg-teal-500 text-black rounded-lg font-medium transition hover:bg-teal-700  duration-200" />
}