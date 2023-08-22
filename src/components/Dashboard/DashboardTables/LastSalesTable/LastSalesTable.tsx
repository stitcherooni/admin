import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  TableCell,
  TableContent,
  Head,
} from './LastSalesTable.styled';
import { headCells, rows } from './table-data';
import { useSortingTable } from '../../../shared/Table/utils';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import { Row, TableWrapper } from '../../../shared/Table/Table.styled';
import { getCurrencyByCode } from '../../../../utils/currency';

interface LastSalesTableProps {
  data: any;
}

const LastSalesTable = (props: LastSalesTableProps) => {
  const table = useSortingTable(props.data);
  const {
    page, pagesCount, rowsPerPage, handleChangePage, handleChangeRowsPerPage,
  } = table.pagination;

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
                  key={row.orderId}
                >
                  <TableCell className="id">
                    <Link to={`/dashboard/reporting?type=orders&orderId=${row.orderId}`}>{row.orderId}</Link>
                  </TableCell>
                  <TableCell className="date">
                    <p>{dayjs(row.date).format('DD/MM/YYYY HH:MM')}</p>
                  </TableCell>
                  <TableCell className="customer-name">
                    <p>{row.customerName}</p>
                  </TableCell>
                  <TableCell className="value">
                    <p>{`${getCurrencyByCode(row.currency, row.value)}`}</p>
                  </TableCell>
                </Row>
              ))}
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

export default LastSalesTable;
