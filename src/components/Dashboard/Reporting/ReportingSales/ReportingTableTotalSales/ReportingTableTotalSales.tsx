import React from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { useSortingTable } from '../../../../shared/Table/utils';
import { Row, TableWrapper } from '../../../../shared/Table/Table.styled';
import { TableCell, Head } from './ReportingTableTotalSales.styled';
import { rows, headCells } from './table-data';
import TablePagination from '../../../../shared/Table/TablePagination/TablePagination';

const ReportingTableTotalSales = () => {
  const table = useSortingTable(rows);
  const {
    page, pagesCount, rowsPerPage, handleChangePage, handleChangeRowsPerPage,
  } = table.pagination;

  return (
    <TableWrapper>
      <TableContainer>
        <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small">
          <Head cells={headCells} className="table-head" />
          <TableBody>
            {table.visibleRows.map((row) => (
              <Row key={row.num}>
                <TableCell className="row-id">
                  <p>{row.num}</p>
                </TableCell>
                <TableCell className="product-name">
                  <p>{row.product}</p>
                </TableCell>
                <TableCell className="quantity">
                  <p>{row.quantity}</p>
                </TableCell>
                <TableCell className="target-quantity">
                  <p>{row.targetQuantity}</p>
                </TableCell>
                <TableCell className="difference">
                  <p>{row.difference}</p>
                </TableCell>
                <TableCell className="attaintment">
                  <p>{row.attaintment}</p>
                </TableCell>
                <TableCell className="total-sales">
                  <p>{`${row.currency}${row.totalSales}`}</p>
                </TableCell>
              </Row>
            ))}
            <Row>
              <TableCell className="row-id" />
              <TableCell className="product-name">
                <p>Less booking fee:</p>
              </TableCell>
              <TableCell className="quantity accent">
                <p>0</p>
              </TableCell>
              <TableCell className="target-quantity" />
              <TableCell className="difference" />
              <TableCell className="attaintment" />
              <TableCell className="total-sales accent">
                <p>£0.00</p>
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
  );
};

export default ReportingTableTotalSales;
