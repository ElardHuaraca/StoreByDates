import { DeleteStore, StoreById } from "@/helpers/DatabaseController";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const store = await StoreById(id) as unknown as IDetailStoreModel

    if (store === null) return NextResponse.json({}, { status: 404 })

    return NextResponse.json(store);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const { id } = params
    const response = await DeleteStore(id)
    if (response !== 1) return NextResponse.json({ status: 404 })
    return NextResponse.json({ status: 200 })
}
