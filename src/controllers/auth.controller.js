import { json, request, response } from "express";
import { findUserByEmail, getAllUsers, insertNewUser } from "../repositories/user.repository";
import bcrypt from 'bcryptjs';
import { genJWT } from "../helpers/jwt.helpet";
import { getConnection } from "../database";
import { queries } from "../database";

export const registerUser = async (req = request, res = response) => {
    try {
        const { email, ...rest } = req.body;
        const {recordset} = await findUserByEmail(email);
        const [data] = recordset;
        if (Object.values(req.body).includes("")) {
            return res.status(400), json({
                msg: 'please complete the current form'
            })
        }

        if (data) {
            return res.status(400).json({
                msg: 'user already exists with this email'
            });
        }

        //encriptar password
        const salt = bcrypt.genSaltSync();
        const passwordCrypted = bcrypt.hashSync(rest.password, salt);

        const newUser = {
            name: rest.name,
            email,
            telf: rest.telf,
            pass: passwordCrypted,
            ruc: rest.ruc
        };

        await insertNewUser({ ...newUser });

        const token = genJWT(email);

        res.status(200).json({
            ok: true,
            msg: 'user created',
            user: {
                name: newUser.name,
                email: newUser.email,
                token,
            }
        })

    } catch (error) {
        if (error instanceof Error) {
            console.log(error)

            res.status(500).json({
                msg: 'internal server error',
                error: error.message
            })
        }
    }
}


export const loginUser = async (req = request, res = response) => {
    try {
        const { email, password } = req.body

        if (Object.values(req.body).includes("")) {
            return res.status(400).json({
                ok: false,
                msg: 'please complete the current form'
            })
        }

        const { recordset } = await findUserByEmail(email);
        const [data] = recordset;

        if (!data) {
            return res.status(400).json({
                ok: false,
                msg: 'invalid fields'
            })
        }

        // validando password
        const passwordMatch = bcrypt.compareSync(password, data.pass.trim());

        if (!passwordMatch) {
            return res.status(400).json({
                ok: false,
                msg: 'invalid fields'
            })
        }

        const token = genJWT(email);

        return res.status(200).json({
            ok: true,
            msg: 'login succesfully',
            info: {
                token,
            }
        })

    } catch (error) {
        if (error instanceof Error) {
            console.log(error);

            res.status(500).json({
                ok: false,
                msg: 'internal server error',
                error: error.message
            })
        }
    }


}

export const getUsers = async (req, res) => {
    try {
        const result = await getAllUsers();

        res.status(200)
            .json({
                users: result.recordset
            });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

export const getUserById = async (req, res) => {
    console.log('entra');
    const { ruc } = req.params;
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("ruc", ruc)
        .query(queries.getUserById);

    console.log(result);
    res.send(result.recordset[0]);
};