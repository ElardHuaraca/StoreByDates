import fs from 'fs'
import { headers } from 'next/dist/client/components/headers'
import { set_fs, utils, writeFile, readFile } from 'xlsx'

export const FILENAME = "reporte_fechas.xlsx"
const PATH = "storage"
export const PATH_FILE = `${PATH}//${FILENAME}`

/* Set parameters */
set_fs(fs)

export const WriteFileXlsx = ({ store_name, catalyst_name, data, headers_data }: { store_name: string, catalyst_name: string, data: any[], headers_data: any }) => {
    const xlsxFile = CreateOrWriteFile()
    if (xlsxFile.SheetNames.indexOf(catalyst_name) === -1) {
        const workSheetItem = utils.json_to_sheet(
            [
                {
                    'modified': "STORE REFERENCE:",
                    'element': store_name
                },
                {
                    'modified': ''
                },
                {
                    'modified': ''
                },
                headers_data,
                ...data
            ],
            {
                header: ['modified', 'element', 'label', 'data_size', 'ultimate'],
                skipHeader: true,
                origin: "A1",
            })

        utils.book_append_sheet(xlsxFile, workSheetItem, catalyst_name)
        writeFile(xlsxFile, PATH_FILE)
    }
}

function CreateOrWriteFile() {
    /* detect if file reporte.xlsx exist */
    if (!fs.existsSync(PATH_FILE)) {
        fs.mkdirSync(PATH, { recursive: true })
        const workSheet = utils.json_to_sheet([])
        const wb = utils.book_new()
        utils.book_append_sheet(wb, workSheet, 'Sheet 1')
        writeFile(wb, PATH_FILE)
    }

    return readFile(PATH_FILE)
}