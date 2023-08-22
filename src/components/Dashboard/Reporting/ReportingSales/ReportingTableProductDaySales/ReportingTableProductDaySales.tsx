import React, { ChangeEvent } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useDispatch } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import dayjs from 'dayjs';
import { useSortingTable } from '../../../../shared/Table/utils';
import { Row, TableWrapper } from '../../../../shared/Table/Table.styled';
import { TableCell, Head } from './ReportingTableProductDaySales.styled';
import { headCells } from './table-data';
import TablePagination from '../../../../shared/Table/TablePagination/TablePagination';
import { ProductsSoldByDayItem } from '../../../../../types/reporting/sales';
import { AppDispatch } from '../../../../../redux/store';
import { getSalesStat } from '../../../../../redux/actions/reporting.actions';
import { getCurrencyByCode } from '../../../../../utils/currency';

interface ReportingTableProductDaySalesProps extends ProductsSoldByDayItem {
  currency: string;
}

const ReportingTableProductDaySales = (props: ReportingTableProductDaySalesProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const table = useSortingTable(props.data || [], {
    totalCount: props.totalCount,
    totalPages: props.totalPages,
    pageSize: props.pageSize,
    currentPage: props.currentPage,
  });
  const {
    page, pagesCount, rowsPerPage,
  } = table.pagination;

  const changePage = (e: ChangeEvent, newPage?: number) => {
    e.preventDefault();
    dispatch(
      getSalesStat({
        page: newPage,
        pageSize: rowsPerPage,
      }),
    );
  };

  const changeRowsPerPage = (e: SelectChangeEvent<unknown>) => {
    dispatch(
      getSalesStat({
        page: 1,
        pageSize: parseInt((e.target as HTMLSelectElement).value, 10),
      }),
    );
  };

  return (
    <TableWrapper>
      <TableContainer>
        <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small">
          <Head cells={headCells} className="table-head" />
          <TableBody>
            {table.visibleRows.map((row) => (
              <Row key={row.num}>
                <TableCell className="date">
                  <p>{dayjs(row.date).format('DD/MM/YYYY HH:MM')}</p>
                </TableCell>
                <TableCell className="percentage">
                  <p>{`${row.percentage}%`}</p>
                </TableCell>
                <TableCell className="quantity">
                  <p>{row.quantity}</p>
                </TableCell>
                <TableCell className="quantity-to-date">
                  <p>{row.quantityToDate}</p>
                </TableCell>
                <TableCell className="total-sales">
                  <p>{`${getCurrencyByCode(props.currency, row.totalSales)}`}</p>
                </TableCell>
                <TableCell className="to-date">
                  <p>{`${getCurrencyByCode(props.currency, row.toDate)}`}</p>
                </TableCell>
              </Row>
            ))}
            <Row>
              <TableCell className="date" />
              <TableCell className="percentage">
                <strong>{`${props.totalPercentage}%`}</strong>
              </TableCell>
              <TableCell className="quantity">
                <strong>{props.totalQuantity}</strong>
              </TableCell>
              <TableCell className="quantity-to-date">
                <strong>{props.totalQuantityToDate}</strong>
              </TableCell>
              <TableCell className="total-sales">
                <strong>{`${getCurrencyByCode(props.currency, props.totalSales ?? 0)}`}</strong>
              </TableCell>
              <TableCell className="to-date">
                <strong>{`${getCurrencyByCode(props.currency, props.totalToDate ?? 0)}`}</strong>
              </TableCell>
            </Row>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        handleChangePage={changePage}
        handleChangeRowsPerPage={changeRowsPerPage}
        page={page}
        pagesCount={pagesCount}
        rowsPerPage={rowsPerPage}
        options={[5, 10, 25]}
      />
    </TableWrapper>
  );
};

export default ReportingTableProductDaySales;
