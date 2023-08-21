import {
  ChangeEvent, useState, useMemo,
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
};

const useTableSearching = <T extends { rows: any[], converted: any[] }>(data: T,
  columns: string[]) => {
  const [searchText, setSearchText] = useState('');
  // eslint-disable-next-line max-len
  const updateSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.trim());
  };
  const prepare = (row: T, allData: string[] = []) => {
    Object.entries(row).forEach((item) => {
      const [key, value] = item;
      if (columns.includes(key)) {
        if (value && typeof value === 'object') prepare(value as unknown as T, allData);
        else allData.push(`${value} `);
      }
    });
    return allData;
  };

  const searchRows = useMemo(() => {
    const rowMap = new Map();
    data.converted.forEach((item, i) => {
      const dataItem = prepare(item).toString();
      rowMap.set(dataItem, data.rows[i]);
    });
    return rowMap;
  }, [data]);

  const foundData: T[] = useMemo(() => {
    const result = [] as T[];
    Array.from(searchRows).forEach((item) => {
      const [key, value] = item;
      if (searchText?.length) {
        if (key.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
          result.push(value);
        }
      }
    });
    return result;
  }, [searchRows, searchText]);

  return {
    updateSearchText,
    foundData,
    searchText,
    isSearching: Boolean(searchText.length),
    isFound: Boolean(foundData.length),
  };
};

const useTableCustomization = (columns: CellProps[]) => {
  const [columnsOptions, setColumnsOptions] = useState(createCellsOptions(columns));
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
    if (!columns.length) return [];
    return columns.filter((item) => columnsOptions.get(item.id).checked);
  }, [columns, columnsOptions]);

  return { columnsOptions, updateColumnsOptions, visibleColumns };
};

const useTableSorting = () => {
  const [sort, setSort] = useState<Array<string | Order>[]>([]);
  const handleRequestSort = (property: string, order: Order) => {
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

  return {
    convertedSort, handleRequestSort,
  };
};

export const useSortingTable = <T extends {}>(rows: T[],
  other?: SortingTableProps, convertCb?: (data: any[], currency?: string) => any[]) => {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const {
    foundData, searchText, isFound, isSearching, updateSearchText,
  } = useTableSearching(
    {
      rows,
      converted: convertCb ? convertCb(rows) : [],
    },
    other?.columns?.map((item) => item.id) ?? [],
  );
  const [page, setPage] = useState(!other?.currentPage ? 1 : other?.currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(!other?.pageSize ? 10 : other?.pageSize);

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

  const { convertedSort, handleRequestSort } = useTableSorting();

  const visibleRows = useMemo(
    () => (!other ? _orderBy(rows, convertedSort.fields, convertedSort.orders).slice(
      (page - 1) * rowsPerPage,
      (page - 1) * rowsPerPage + rowsPerPage,
    ) : _orderBy(rows, convertedSort.fields, convertedSort.orders)),
    [convertedSort, page, rowsPerPage, rows, other],
  );

  const pagesCount = useMemo(() => {
    if (searchText.length) {
      return Math.ceil(foundData.length / rowsPerPage);
    }
    return other?.totalPages ? other?.totalPages : Math.ceil(rows.length / rowsPerPage);
  }, [rows.length, rowsPerPage, foundData, searchText, other?.totalPages]);

  const {
    columnsOptions, updateColumnsOptions,
    visibleColumns,
  } = useTableCustomization(other?.columns ?? []);

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
      pagesCount,
      pageSizes: [10, 25, 50, 100],
    },
    visibleRows: !searchText.length ? visibleRows : foundData as unknown as T[],
    customization: {
      columnsOptions,
      updateColumnsOptions,
      visibleColumns,
    },
    search: {
      updateSearchText,
      isFound,
      isSearching,
    },
  };
};
