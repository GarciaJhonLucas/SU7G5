import { db } from "../utils/db.server";

type play = {
    id:number;
    name: string;
    userId:number;
}

export const listPlaylist = async (): Promise<play[]> => {
    return db.playlist.findMany({
        select: {
            id: true,
            name: true,
            userId:true,
            user:false,
            songs:true,
        }
    })
}