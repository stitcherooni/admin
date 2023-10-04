import { ChangeEvent } from 'react';
import { CellProps } from './TableHead/TableHead';

export interface SortingTableProps {
  columns?: CellProps[];
  totalCount?: number;
}

export type TableOrder = 'desc' | 'asc';

export interface SortingTableData<T> {
  selection: {
    selected: readonly string[];
    handleSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    handleClick: (event: any, id: string) => void;
    checkIsSelected: (id: string) => boolean;
  }
  sorting: {
    handleRequestSort: (property: string, order: TableOrder) => void;
    filters: {
      fields: string[];
      orders: TableOrder[];
    };
  }
  pagination: {
    page: number;
    handleChangePage: (event: any, newPage?: number) => void;
    rowsPerPage: number;
    handleChangeRowsPerPage: (event: any) => void;
    pagesCount: number;
    pageSizes: number[];
    totalRows: number | undefined;
  }
  visibleRows: T[]
  allRows: T[]
  customization: {
    columnsOptions: Map<any, any>;
    updateColumnsOptions: (columnId: string) => void;
    visibleColumns: CellProps[];
  }
  search: {
    updateSearchText: (e: ChangeEvent<HTMLInputElement>) => void;
    isFound: boolean;
    isSearching: boolean;
  }
}
