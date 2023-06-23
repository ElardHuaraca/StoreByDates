import { NextResponse } from "next/server";


export async function GET() {
    return NextResponse.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
        { id: 3, name: 'Arya Doe' },
        { id: 4, name: 'Joe Doe' },
        { id: 5, name: 'Jill Doe' },
        { id: 6, name: 'Jenny Doe' },
    ])
}