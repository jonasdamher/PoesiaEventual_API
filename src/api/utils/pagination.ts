'use strict';

import Pagination from '../types/Pagination';

export async function get_pagination(model: any, page: number, perPage: number, data: any = {}): Promise<Pagination> {
    return new Promise((resolve, reject) => {

        let current_page = Math.max(0, page);
        const pageNum = current_page;
        --current_page;

        model.find(data).countDocuments().then((total: any) => {

            const lastPage = Math.ceil(total / perPage);
            const pagination: Pagination = {
                page: pageNum,
                lastPage: lastPage,
                perPage: perPage,
                total: total,
                page_range: perPage * current_page
            };
            resolve(pagination);

        }).catch((err: any) => {
            reject(err);
        });
    });
}

export function currentPage(pageNumber: any) {
    let page = 1;
    if (pageNumber > 0) {
        page = Number(pageNumber ?? 1);
    }
    return page;
}

export function currentPerPage(perPageNumber: any) {
    let perPage = 10;
    if (perPageNumber > 0 && perPageNumber <= 30) {
        perPage = Number(perPageNumber ?? 10);
    }
    return perPage;
}

export function paginate(pagination: Pagination) {
    return {
        page: pagination.page,
        lastPage: pagination.lastPage,
        perPage: pagination.perPage,
        total: pagination.total
    };
}