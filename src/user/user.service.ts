import { db } from "../utils/db.server";
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

type user = {
    id: number
    email: string
    name: string
    password: string
}

export const listUsers = async (): Promise<user[]> => {
    return db.users.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            date_born: true
        }
    })
}

// Get user by id
export const getUser = async (id: number): Promise<user | null> => {
    return db.users.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true
        }
    })
}

// Create user
export const createUser = async (user: Omit<user, 'id'>): Promise<user> => {
    const { email, name, password } = user;
    var hash = bcrypt.hashSync(password, salt);
    return db.users.create({
        data: {
            email,
            name,
            password: hash,
        },
        select: {
            id: true,
            email: true,
            name: true,
            password: true,
        }
    })
}

// Update User
export const updateUsers = async (user: Omit<user, 'id'>, id: number): Promise<user> => {
    const { email, name, password } = user;
    return db.users.update({
        where: {
            id,
        },
        data: {
            email,
            name,
            password,
        },
        select: {
            id: true,
            email: true,
            name: true,
            password: true,
        }
    })
}


// Delete users
export const deleteUsers = async (id: number): Promise<void> => {
    await db.users.delete({
        where: {
            id,
        },
    })
}


// login
export const userLogin = async (userLogin: Omit<user, 'id'>): Promise<user | null> => {
    const { email } = userLogin;
    return db.users.findUnique({
        where: {
            email,
        }
    })
}