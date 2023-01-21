import { db } from "../utils/db.server";

type song = {
    id: number;
    name: string;
    artist: string;
    album: string;
    year: number;
    genre: string;
    duration: number;
}

export const listSongs = async (): Promise<song[]> => {
    return db.song.findMany({
        select: {
            id: true,
            name: true,
            artist: true,
            album: true,
            year: true,
            genre: true,
            duration: true,
        }
    })
}