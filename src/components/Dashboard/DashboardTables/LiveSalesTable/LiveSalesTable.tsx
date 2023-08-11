import React from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  TableCell,
  TableContent,
  Head,
} from './LiveSalesTable.styled';
import { headCells, rows } from './table-data';
import { useSortingTable } from '../../../shared/Table/utils';
import { Row, TableWrapper } from '../../../shared/Table/Table.styled';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import { getCurrencyByCode } from '../../../../utils/currency';

interface LiveSalesTableProps {
  data: any;
  totalQuantitySold: number;
  totalQuantityLeft: number;
  totalSales: number;
  currency: string;
  currentPage: number;
  pageSize: number;
}

const LiveSalesTable = (props: LiveSalesTableProps) => {
  const table = useSortingTable(props.data, { page: props.currentPage, pageSize: props.pageSize });
  const {
    page, pagesCount, rowsPerPage, handleChangePage, handleChangeRowsPerPage,
  } = table.pagination;

  // need eventId and productId
  // need to count total values manually?

  return (
    <TableContent>
      <TableWrapper>
        <TableContainer>
          <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small">
            <Head
              cells={headCells}
              className="table-head"
            />
            <TableBody>
              {table.visibleRows.map((row) => (
                <Row
                  key={row.id}
                >
                  <TableCell className="name">
                    <Link to="/event-products?eventId=&productId=">{row.name}</Link>
                  </TableCell>
                  <TableCell className="type">
                    <p>{row.type}</p>
                  </TableCell>
                  <TableCell className="start-date">
                    <p>{dayjs(row.startDate).format('DD/MM/YYYY HH:MM')}</p>
                  </TableCell>
                  <TableCell className="end-date">
                    <p>{dayjs(row.endDate).format('DD/MM/YYYY HH:MM')}</p>
                  </TableCell>
                  <TableCell className="price">
                    <p>{`${getCurrencyByCode(row.currency)}${row.price}`}</p>
                  </TableCell>
                  <TableCell className="quantity-sold">
                    <p>{row.quantitySold}</p>
                  </TableCell>
                  <TableCell className="quantity-left">
                    <p>{row.quantityLeft}</p>
                  </TableCell>
                  <TableCell className="sales">
                    <p>{`${getCurrencyByCode(row.currency)}${row.sales}`}</p>
                  </TableCell>
                </Row>
              ))}
              <Row>
                <TableCell className="name" />
                <TableCell className="type hidden" />
                <TableCell className="start-date hidden" />
                <TableCell className="end-date hidden" />
                <TableCell className="price hidden" />
                <TableCell className="quantity-sold">
                  <strong>{props.totalQuantitySold}</strong>
                </TableCell>
                <TableCell className="quantity-left">
                  <strong>{props.totalQuantityLeft}</strong>
                </TableCell>
                <TableCell className="sales">
                  <strong>{`${getCurrencyByCode(props.currency)}${props.totalSales}`}</strong>
                </TableCell>
              </Row>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          pagesCount={pagesCount}
          rowsPerPage={rowsPerPage}
          options={[5, 10, 25]}
        />
      </TableWrapper>
    </TableContent>
  );
};

export default LiveSalesTable;
