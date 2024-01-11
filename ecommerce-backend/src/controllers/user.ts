import { Request, Response } from "express"
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";

export const newuser = async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response
) => {
    try {

        const { name, email, photo, gender, _id, dob } = req.body;

        const user = await User.create({
            name, email, photo, gender, _id, dob:new Date(dob),

        })


        res.status(201).json({
            success: true,
            message: `Welcome ${user.name}`
        })

    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })

    }
}