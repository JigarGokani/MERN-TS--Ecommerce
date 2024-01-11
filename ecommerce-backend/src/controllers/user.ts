import { Request, Response } from "express"

export const newuser =(req:Request,res:Response)=>{
res.send("Hi World")
}