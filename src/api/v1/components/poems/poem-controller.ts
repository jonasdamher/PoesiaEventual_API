'use strict';

import { Request, Response } from 'express';
import * as service from './poem-service';
// Tipos
import Response_data from '../../types/Response_data';

export {
    getAll,
    getWithId,
    searchPoem,
    random
}

async function getAll(req: Request, res: Response) {

    const { page, perpage } = req.query;
 
    let current_page = Number(page ?? 1);
    let current_perpage = Number(perpage ?? 10);
    
    const poem: Response_data = await service.getAll(current_page, current_perpage);
    return res.status(poem.status).json(poem);
}
async function getWithId(req: Request, res: Response) {

    const id = req.params.id;

    const poem: Response_data = await service.getWithId(id);
    return res.status(poem.status).json(poem);
}

async function searchPoem(req: Request, res: Response) {

    const { page, perpage } = req.query;
    const search = req.params.search.trim().toLowerCase();

    let current_page = Number(page ?? 1);
    let current_perpage = Number(perpage ?? 10);
    
    const poem: Response_data = await service.searchPoem(current_page, current_perpage, search);
    return res.status(poem.status).json(poem);
}

async function random(req: Request, res: Response) {

    const poem: Response_data = await service.random();
    return res.status(poem.status).json(poem);
}
