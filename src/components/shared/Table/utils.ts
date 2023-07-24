import {
  ChangeEvent, useState, MouseEvent, useMemo,
} from 'react';
import _orderBy from 'lodash.orderby';
import { Order } from './ReportingTable';

export const useSortingTable = <T>(rows: T) => {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const checkIsSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleClick = (event: MouseEvent<HTMLTableCellElement | HTMLButtonElement>, id: string) => {
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
    setPage(newPage);
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
    () => _orderBy(rows, convertedSort.fields, convertedSort.orders).slice(
      (page - 1) * rowsPerPage,
      (page - 1) * rowsPerPage + rowsPerPage,
    ),
    [convertedSort, page, rowsPerPage],
  );

  const rowsListById = useMemo(() => {
    const data = {};
    rows.forEach((row) => {
      data[row.id] = row;
    });

    return data;
  }, [rows]);

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
    },
    pagination: {
      page,
      handleChangePage,
      rowsPerPage,
      handleChangeRowsPerPage,
      pagesCount,
      pageSizes: [10, 25, 50, 100],
    },
    visibleRows,
    rowsListById,
  };
};
