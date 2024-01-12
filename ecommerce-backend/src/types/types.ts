import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
    name: string;
    email: string;
    photo: string;
    gender: string;
    _id: string;
    dob: Date;
  }

  export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response<any, Record<string, any>>>;

  export interface NewProductRequestBody {
    name: string;
    category: string;
    price:number;
    stock:number;


    
  }


  export type SearchRequestQuery = {
    search?: string;
    price?: string;
    category?: string;
    sort?: string;
    page?: string;
  };


  export interface BaseQuery {
    name?: {
      $regex: string;
      $options: string;
    };
    price?: { $lte: number };
    category?: string;
  }

  export type InvalidateCacheProps = {
    product?: boolean;
    order?: boolean;
    admin?: boolean;
  };