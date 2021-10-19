'use strict';

export async function get_pagination(model: any, page: number, perpage: number, data: any = {}) {
    return new Promise((resolve, reject) => {

        let current_page = Math.max(0, page);
        let pageNum = current_page;
        --current_page;

        model.find(data).countDocuments().then((total: any) => {

            const lastPage = Math.ceil(total / perpage)

            resolve({
                page: pageNum,
                lastPage: lastPage,
                perpage: perpage,
                total: total,
                page_range: perpage * current_page
            });

        }).catch((err: any) => {
            reject(err);
        });
    });
}

export function currentPage(pageNumber: any) {
    let page = 1;
    if (pageNumber > 0) {
        page = Number(pageNumber ?? 1)
    }
    return page;
}

export function currentPerPage(perPageNumber: any) {
    let perpage = 10;
    if (perPageNumber > 0 && perPageNumber <= 30) {
        perpage = Number(perPageNumber ?? 10)
    }
    return perpage;
}

export function paginate(pagination: any) {
    return {
        page: pagination.page,
        lastPage: pagination.lastPage,
        perPage: pagination.perpage,
        total: pagination.total
    }
}