'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = exports.get_pagination = void 0;
function get_pagination(model, page, perpage, data = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let current_page = Math.max(0, page);
            let pageNum = current_page;
            --current_page;
            model.find(data).countDocuments().then((total) => {
                const lastPage = Math.ceil(total / perpage);
                resolve({
                    page: pageNum,
                    lastPage: lastPage,
                    perpage: perpage,
                    total: total,
                    page_range: perpage * current_page
                });
            }).catch((err) => {
                reject(err);
            });
        });
    });
}
exports.get_pagination = get_pagination;
function paginate(pagination) {
    return {
        page: pagination.page,
        lastPage: pagination.lastPage,
        perPage: pagination.perpage,
        total: pagination.total
    };
}
exports.paginate = paginate;
//# sourceMappingURL=pagination.js.map