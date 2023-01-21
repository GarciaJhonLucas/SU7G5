import { type } from "os";
import { db } from "../src/utils/db.server";

type user = {
    email: string
    name: String
    password: String
}

type song = {
    name: string;
    artist: string;
    album: string;
    year: number;
    genre: string;
    duration: number;
    playlistid: number
}

type playlist = {
    name: string;
}

async function seed() {
    await Promise.all(
        getUsers().map((user) => {
            return db.users.create({
                data: {
                    email: user.email,
                    name: user.name,
                    password: user.password,
                },
            })
        })
    );
    await Promise.all(
        getPlaylists().map((playlist) => {
            return db.playlist.create({
                data: {
                    name: playlist.name,
                    userId: 1
                },
            })
        })
    );
    await Promise.all(
        getSongs().map((song) => {
            return db.song.create({
                data: {
                    name: song.name,
                    artist: song.artist,
                    album: song.album,
                    year: song.year,
                    genre: song.genre,
                    duration: song.duration,
                    playlistid: song.playlistid,
                },
            })
        })
    );
}

seed();

function getUsers() {
    return [{
        email: 'hola@as.com',
        name: 'example-admin',
        password: 'silabuz123',
    }]
}

function getPlaylists(): Array<playlist> {
    return [{
        name: 'Despacito',
    }]
}

function getSongs(): Array<song> {
    return [{
        name: 'Despacito',
        album: 'Despacito',
        artist: 'Luis Fonsi',
        year: 2015,
        genre: 'Regueaton',
        duration: 520,
        playlistid: 1
    }]
}