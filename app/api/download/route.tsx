import fs from "fs";
import { FILENAME, PATH_FILE } from "@/helpers/XLSX.helper";
import { NextResponse } from "next/server";

/* Dowload file filename.xlsx */
export async function GET() {

    if (!fs.existsSync(PATH_FILE)) return new NextResponse(null, { status: 404 })

    const readStream = fs.readFileSync(PATH_FILE)
    const headers: HeadersInit = {
        "Content-Disposition": `attachment; filename=${FILENAME}`,
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Length": readStream.length.toString(),
    }

    /* delete file */
    fs.unlinkSync(PATH_FILE)

    return new NextResponse(readStream, { headers })
}
