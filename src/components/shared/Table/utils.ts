import {
  ChangeEvent, useState, MouseEvent, useMemo,
} from 'react';
import _orderBy from 'lodash.orderby';
import { CellProps } from './TableHead/TableHead';

interface SortingTableProps {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  columns?: CellProps[];
}

type Order = 'desc' | 'asc';

const createCellsOptions = (cells: CellProps[]) => {
  const options = new Map();
  cells.forEach((item) => {
    options.set(item.id, {
      name: item.label,
      checked: true,
    });
  });
  return options;
}

export const useSortingTable = <T>(rows: T[], other?: SortingTableProps) => {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(!other?.currentPage ? 1 : other?.currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(!other?.pageSize ? 10 : other?.pageSize);
  const [sort, setSort] = useState<Array<string | Order>[]>([]);
  const [columnsOptions, setColumnsOptions] = useState(createCellsOptions(other?.columns ?? []));
  const updateColumnsOptions = (columnId: string) => {
    setColumnsOptions((colsOptions) => {
      const data = new Map(colsOptions);
      const selectedOption = data.get(columnId);
      data.set(columnId, {
        ...selectedOption,
        checked: !selectedOption.checked,
      });
      return data;
    });
  };
  const visibleColumns = useMemo(() => {
    if (!other?.columns) return [];
    return other?.columns.filter((item) => columnsOptions.get(item.id).checked);
  }, [other?.columns, columnsOptions]);

  const handleRequestSort = (property: string, order: 'asc' | 'desc') => {
    setSort((sortState) => {
      let arr = [...sortState];
      const isFilterExists = arr.find((item) => item[0] === property);

      if (isFilterExists) {
        arr = arr.filter((item) => item[0] !== property);
      }

      arr.unshift([property, order]);

      return arr;
    });
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => (n as any).id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const checkIsSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleClick = (event: any, id: string) => {
    if ([...event.target.parentNode.classList].includes('remove-button')) return;

    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage?: number) => {
    setPage(newPage as number);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const convertedSort = useMemo(() => {
    const fields: string[] = [];
    const orders: Order[] = [];
    sort.forEach((item) => {
      const [field, order] = item;
      fields.push(field);
      orders.push(order as Order);
    });

    return { fields, orders };
  }, [sort]);

  const visibleRows = useMemo(
    () => (!other ? _orderBy(rows, convertedSort.fields, convertedSort.orders).slice(
      (page - 1) * rowsPerPage,
      (page - 1) * rowsPerPage + rowsPerPage,
    ) : _orderBy(rows, convertedSort.fields, convertedSort.orders)),
    [convertedSort, page, rowsPerPage, rows, other],
  );

  const pagesCount = useMemo(() => Math.ceil(rows.length / rowsPerPage), [rows.length, rowsPerPage]);

  return {
    selection: {
      selected,
      handleSelectAllClick,
      handleClick,
      checkIsSelected,
    },
    sorting: {
      handleRequestSort,
      filters: convertedSort,
    },
    pagination: {
      page: other?.currentPage ? other.currentPage : page,
      handleChangePage,
      rowsPerPage: other?.pageSize ? other.pageSize : rowsPerPage,
      handleChangeRowsPerPage,
      pagesCount: other?.totalPages ? other.totalPages : pagesCount,
      pageSizes: [10, 25, 50, 100],
    },
    visibleRows,
    customization: {
      columnsOptions,
      updateColumnsOptions,
      visibleColumns,
    },
  };
};
