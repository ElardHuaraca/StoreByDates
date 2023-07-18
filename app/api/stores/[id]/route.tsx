import { DeleteStore, StoreById, UpdateStore } from "@/helpers/DatabaseController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const store = await StoreById(id) as unknown as IDetailStoreModel

    if (store === null) return NextResponse.json({}, { status: 404 })

    return NextResponse.json(store);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const { id } = params
    const response = await DeleteStore(id)
    if (response !== 1) return NextResponse.json({}, { status: 404 })
    return NextResponse.json({ status: 200 })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params
    const { name_store, ip_store, version_store } = Object.fromEntries(await request.formData())
    const type = version_store === 'na' ? undefined : Number(version_store)
    const response = await UpdateStore({ id, name: name_store.toString(), ip: ip_store.toString(), type })

    if (response !== 1) return NextResponse.json({}, { status: 404 })

    const store = await StoreById(id)
    console.log(store)

    return NextResponse.json(store)
}