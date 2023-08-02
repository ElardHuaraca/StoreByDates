import { StoreByName } from "@/helpers/DatabaseController";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { name: string } }) {
    const { name } = params;
    const store = await StoreByName({ name })

    if (store === null) return NextResponse.json({}, { status: 404 })

    return NextResponse.json(store);
}