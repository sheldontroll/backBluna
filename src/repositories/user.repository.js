import { getConnection, sql } from '../database/connection'

import { queries } from '../database';


export const findUserByEmail = async (email = '') => {
    const pool = await getConnection();
    const usr = await pool.request()
        .input('email', email)
        .query(queries.findUserByEmail);

    return usr
}


export const insertNewUser = async ({
    email,
    name,
    telf,
    pass,
    ruc
}) => {
    const pool = await getConnection();

    await pool.request()
        .input('email', email)
        .input('name', name)
        .input('telf', telf)
        .input('pass', pass)
        .input('ruc', ruc)
        .query(queries.insertNewUser);
}


export const getAllUsers = async () => {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllUsers);

    return result
}

export const getUserById = async (req, res) => {
    const { ruc } = req.params;
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("ruc", ruc)
        .query(queries.getUserById);

    console.log(result);
    res.send(result.recordset[0]);
};