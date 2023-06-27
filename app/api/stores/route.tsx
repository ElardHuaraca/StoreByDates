import { AllStores } from "@/helpers/DatabaseController";
import { NextResponse } from "next/server";

export async function GET() {
    /* avoid cache */
    const stores = await AllStores() as StoreModel[]

    if (stores.length === 0) return NextResponse.json({}, { status: 404 })

    return NextResponse.json(stores)
}

export async function POST(request: Request) {
    return NextResponse.json(await request.json())
}