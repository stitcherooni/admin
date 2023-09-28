import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  StyledAlert,
  TableCaption,
  TableCell,
  TableContent,
  Head,
  Wrapper,
} from './ReportingInvoices.styled';
import { Row, StyledTableWrapper, TableWrapper } from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import { headCells, rows } from './table-data'; 
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import { RootState } from '../../../../redux/store';
import { getCurrencyByCode } from '../../../../utils/currency';
import { InvoiceStatItem } from '../../../../types/reporting/invoices';

const ReportingInvoices = () => {
  const invoicesData = useSelector((state: RootState) => state.reporting.invoices);
  const table = useSortingTable<InvoiceStatItem>(invoicesData.data, {
    columns: headCells,
    totalCount: invoicesData.data.length,
  });
  const { selected, handleSelectAllClick } = table.selection;
  const { handleRequestSort } = table.sorting;
  const {
    page, pagesCount, rowsPerPage, totalRows, handleChangePage, handleChangeRowsPerPage,
  } = table.pagination;

  // please add protocol to invoice url

  return (
    <Wrapper>
      <StyledAlert type="warning" className="invoices-alert">
        <p>
          Our humblest apologies as these invoices should have been automatically emailed to you at
          the point of creation but due to a technical issue, they weren’t being sent. We’ve
          therefore made them available online. These invoices are for all platform fees as well as
          Qflow and premium subscriptions. Invoices for platform fees taken via Stripe are issued
          weekly on a Monday in line with our rolling seven day payout schedule.
        </p>
      </StyledAlert>
      <TableContent>
        <TableCaption>
          <p>
            <strong>{`${totalRows} `}</strong>
            {`${totalRows === 0 || totalRows > 1 ? 'Entries' : 'Entry'}`}
          </p>
        </TableCaption>
        <TableWrapper>
          <StyledTableWrapper>
            <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small">
              <Head
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                cells={headCells}
                className="table-head"
                checkbox={false}
              />
              <TableBody>
                {table.visibleRows.map((row) => (
                  <Row key={row.num}>
                    <TableCell className="invoice-no">
                      <p>{row.invoiceNo}</p>
                    </TableCell>
                    <TableCell className="issue-date">
                      <p>{dayjs(row.issueDate).format('DD/MM/YYYY HH:mm')}</p>
                    </TableCell>
                    <TableCell className="due-date">
                      <p>{dayjs(row.dueDate).format('DD/MM/YYYY HH:mm')}</p>
                    </TableCell>
                    <TableCell className="status">
                      <p>{row.status}</p>
                    </TableCell>
                    <TableCell className="net">
                      <p>{`${getCurrencyByCode(row.currency, row.net)}`}</p>
                    </TableCell>
                    <TableCell className="vat">
                      <p>{`${getCurrencyByCode(row.currency, row.vat)}`}</p>
                    </TableCell>
                    <TableCell className="total">
                      <p>{`${getCurrencyByCode(row.currency, row.total)}`}</p>
                    </TableCell>
                    <TableCell className="invoice">
                      <a href={row.invoice} target="_blank" rel="noreferrer">
                        View
                      </a>
                    </TableCell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </StyledTableWrapper>
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
    </Wrapper>
  );
};

export default ReportingInvoices;
