import { StoreById } from "@/helpers/DatabaseController";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const store = await StoreById(Number(id)) as DetailStore[]

    if (store.length === 0) return NextResponse.json({}, { status: 404 })

    return NextResponse.json(store[0]);
}