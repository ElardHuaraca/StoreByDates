import { AllStores, InitDatabaseAndModels } from "@/helpers/DatabaseController";
import { NextResponse } from "next/server";

let Initialized = false

export async function GET() {
    if (!Initialized) {
        await InitDatabaseAndModels()
        Initialized = true
    }

    /* avoid cache */
    const stores = await AllStores()

    if (stores.length === 0) return NextResponse.json({}, { status: 404 })

    return NextResponse.json(stores)
}

export async function POST(request: Request) {
    return NextResponse.json(await request.json())
}