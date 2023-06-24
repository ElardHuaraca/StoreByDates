import { AllStores } from "@/utils/DatabaseController";
import { NextResponse } from "next/server";


export async function GET() {

    const stores = await AllStores()

    return NextResponse.json(stores)
}