import { applyPagination } from 'src/src2/utils/apply-pagination';
import { applySort } from 'src/src2/utils/apply-sort';
import { deepCopy } from 'src/src2/utils/deep-copy';

import { items } from './data';

class FileManagerApi {
  getItems(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = deepCopy(items);
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((file) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          const matched = file.name.toLowerCase().includes(filters.query.toLowerCase());

          if (!matched) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count,
    });
  }
}

export const fileManagerApi = new FileManagerApi();
