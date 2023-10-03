import {
  ChangeEvent, useState, useMemo, RefObject,
} from 'react';
import _orderBy from 'lodash.orderby';
import { CellProps } from './TableHead/TableHead';
import { SortingTableData, SortingTableProps, TableCopyColumn, TableOrder } from './types';

export const copyTable = (data: Array<string[]>, columns: TableCopyColumn[]) => {
  const columnsName = columns.map((column) => column.name);
  const rows = [columnsName, ...data];
  let table = '';
  rows.forEach((row) => {
    table += `${row.join('/t')}/n`;
  });
  navigator.clipboard.writeText(table);
};

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

const useTableSearching = <T>(rows: T[],
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
    rows.forEach((item, i) => {
      const dataItem = prepare(item).toString();
      rowMap.set(dataItem, rows[i]);
    });
    return rowMap;
  }, [rows]);

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
    return columns.filter((item) => columnsOptions.get(item.id)?.checked);
  }, [columns, columnsOptions]);

  return { columnsOptions, updateColumnsOptions, visibleColumns };
};

const useTableSorting = () => {
  const [sort, setSort] = useState<Array<string | TableOrder>[]>([]);
  const handleRequestSort = (property: string, order: TableOrder) => {
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
    const orders: TableOrder[] = [];
    sort.forEach((item) => {
      const [field, order] = item;
      fields.push(field);
      orders.push(order as TableOrder);
    });

    return { fields, orders };
  }, [sort]);

  return {
    convertedSort, handleRequestSort,
  };
};

export const useSortingTable = <T extends {}>(rows: T[],
  other: SortingTableProps): SortingTableData<T> => {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const {
    foundData, searchText, isFound, isSearching, updateSearchText,
  } = useTableSearching(
    rows,
    other?.columns?.map((item) => item.id) ?? [],
  );
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    () => _orderBy(rows, convertedSort.fields, convertedSort.orders).slice(
      (page - 1) * rowsPerPage,
      (page - 1) * rowsPerPage + rowsPerPage,
    ),
    [convertedSort, page, rowsPerPage, rows, other],
  );

  const pagesCount = useMemo(() => {
    if (searchText.length) {
      return Math.ceil(foundData.length / rowsPerPage);
    }
    return Math.ceil(rows.length / rowsPerPage);
  }, [rows.length, rowsPerPage, foundData, searchText]);

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
      page,
      handleChangePage,
      rowsPerPage,
      handleChangeRowsPerPage,
      pagesCount,
      pageSizes: [10, 25, 50, 100],
      totalRows: !searchText.length ? other?.totalCount : foundData.length,
    },
    visibleRows: !searchText.length ? visibleRows : foundData as unknown as T[],
    allRows: rows,
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
