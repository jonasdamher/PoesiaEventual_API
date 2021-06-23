'use strict';

import { Request, Response } from 'express';
import * as service from './author-service';
// Tipos
import Response_data from '../../types/Response_data';

export {
    getWithId,
    searchAuthor,
    random,
    getPoemsList
}

async function getWithId(req: Request, res: Response) {

    const id = req.params.id;

    const author: Response_data = await service.getWithId(id);
    return res.status(author.status).json(author);
}

async function searchAuthor(req: Request, res: Response) {

    const { page, perpage } = req.query;
    const search = req.params.search.trim().toLowerCase();

    let current_page = Number(page ?? 1);
    let current_perpage = Number(perpage ?? 4);
    
    const author: Response_data = await service.searchAuthor(current_page, current_perpage, search);
    return res.status(author.status).json(author);
}

async function random(req: Request, res: Response) {

    const author: Response_data = await service.random();
    return res.status(author.status).json(author);
}

async function getPoemsList(req: Request, res: Response) {
    const { page, perpage } = req.query;
    const id= req.params.id;

    let current_page = Number(page ?? 1);
    let current_perpage = Number(perpage ?? 4);

    const author: Response_data = await service.getPoemsList(current_page, current_perpage, id);
    return res.status(author.status).json(author);
}
