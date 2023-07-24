import React from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { Link } from 'react-router-dom';
import {
  TableCell,
  TableContent,
  Head,
} from './LiveSalesTable.styled';
import { headCells, rows } from './table-data';
import { useSortingTable } from '../../../shared/Table/utils';
import { Row, TableWrapper } from '../../../shared/Table/Table.styled';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';

const LiveSalesTable = () => {
  const table = useSortingTable(rows);
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
                  key={row.id}
                >
                  <TableCell className="name">
                    <Link to="/">{row.name}</Link>
                  </TableCell>
                  <TableCell className="type">
                    <p>{row.type}</p>
                  </TableCell>
                  <TableCell className="start-date">
                    <p>{row.startDate}</p>
                  </TableCell>
                  <TableCell className="end-date">
                    <p>{row.endDate}</p>
                  </TableCell>
                  <TableCell className="price">
                    <p>{`${row.currency}${row.price}`}</p>
                  </TableCell>
                  <TableCell className="quantity-sold">
                    <p>{row.sold}</p>
                  </TableCell>
                  <TableCell className="quantity-left">
                    <p>{row.left}</p>
                  </TableCell>
                  <TableCell className="sales">
                    <p>{`${row.currency}${row.sales}`}</p>
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
                  <strong>0</strong>
                </TableCell>
                <TableCell className="quantity-left">
                  <strong>0</strong>
                </TableCell>
                <TableCell className="sales">
                  <strong>£0.00</strong>
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
