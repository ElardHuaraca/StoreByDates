import { AllStores } from "@/utils/DatabaseController";
import { NextResponse } from "next/server";

export async function GET() {
    /* avoid cache */
    const stores = await AllStores()

    return NextResponse.json(stores)
}

export async function POST(request: Request) {
    return NextResponse.json(await request.json())
}