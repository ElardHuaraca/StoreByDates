import { AllTypeStore } from "@/helpers/DatabaseController";
import { NextResponse } from "next/server";

export async function GET(_: Request) {
    const type_stores = await AllTypeStore()

    if (type_stores.length === 0) return NextResponse.json({}, { status: 404 })

    return NextResponse.json(type_stores)
}