import { StoreById } from "@/utils/DatabaseController";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const store = await StoreById(Number(id))

    return NextResponse.json(store);
}