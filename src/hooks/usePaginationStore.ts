import { PagingResult } from '@/types'
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type PaginationState = {
    pagination: PagingResult;
    setPagination: (totalCount: number) => void;
    setPage: (pageNumber: number) => void;
    setPageSize: (pageSize: number) => void;
}

const usePaginationStore = create<PaginationState>()(devtools((set) => ({
    pagination: {
        pageNumber: 1,
        pageSize: 12,
        totalCount: 0,
        totalPages: 1
    },
    setPagination: (totalCount: number) => set(state => ({
        pagination: {
            pageNumber: 1,
            pageSize: state.pagination.pageSize,
            totalCount,
            totalPages: Math.ceil(totalCount / state.pagination.pageSize)
        }
    })),
    setPage: (pageNumber: number) => set(state => ({ pagination: { ...state.pagination, pageNumber } })),
    setPageSize: (pageSize: number) => set(state => ({
        pagination: {
            ...state.pagination,
            pageSize,
            pageNumber: 1,
            totalPages: Math.ceil(state.pagination.totalCount / pageSize)
        }
    }))
}), { name: 'paginationStoreDemo' }))

export default usePaginationStore