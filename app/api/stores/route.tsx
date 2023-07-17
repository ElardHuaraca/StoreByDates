import { AllStores, InitDatabaseAndModels, SaveStore } from "@/helpers/DatabaseController";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
    const { name_store, ip_store, version_store } = Object.fromEntries(await request.formData())
    const type = version_store === 'na' ? undefined : Number(version_store)
    const store = await SaveStore({ name: name_store.toString(), ip: ip_store.toString(), type })
    return NextResponse.json(store)
}