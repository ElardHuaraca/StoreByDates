import { StoreById } from "@/utils/DatabaseController";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
    const { id } = request.query;

    const store = await StoreById(Number(id))

    return store
}