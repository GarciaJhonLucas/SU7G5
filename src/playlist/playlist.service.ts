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


// Get user by id
export const getPlaylist = async (id: number): Promise<play | null> => {
    return db.playlist.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            userId:true
        }
    })
}

// Create user
export const createPlaylist = async (play: Omit<play, 'id'>): Promise<play> => {
    const { name, userId } = play;
    return db.playlist.create({
        data: {
            name,
            userId,
        },
        select: {
            id: true,
            name: true,
            userId: true,
        }
    })
}

// Update playlist
export const updatePlaylist = async (user: Omit<play, 'id'>, id:number): Promise<play> => {
    const { name, userId } = user;
    return db.playlist.update({
        where: {
            id,
        },
        data: {
            name,
            userId,
        },
        select: {
            id: true,
            name:true,
            userId: true,
        }
    })
}


// Delete playlist with id
export const deletePlaylist = async (id:number): Promise<void> => {
    await db.playlist.delete({
        where: {
            id,
        },
    })
}