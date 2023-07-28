import { Request } from "express";

interface User {
    _id: string;
}

export interface CustomRequest extends Request {
    user: User;
}