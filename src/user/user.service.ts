import { db } from "../utils/db.server";

type user = {
    id: number
    email: string
    name: String
}

export const listUsers = async (): Promise<user[]> => {
    return db.users.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        }
    })
}