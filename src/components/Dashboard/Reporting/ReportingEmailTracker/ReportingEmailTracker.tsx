import React, { SyntheticEvent, useState } from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { createPortal } from 'react-dom';
import {
  TableCell,
  TableContent,
  Head,
  Wrapper,
  SuccessIcon,
  FailedIcon,
  WarningIcon,
} from './ReportingEmailTracker.styled';
import {
  Row,
  SearchBarWrapper,
  TableCaption,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import { headCells, rows } from './table-data';
import { Overlay, StyledDrawer } from '../Reporting.styled';
import ReportingEmailDetails from './ReportingEmailDetails/ReportingEmailDetails';
import { SecondaryButton } from '../../../shared/Buttons/Buttons.styled';
import ShevronRight from '../../../../assets/icons/shevron-right';
import { theme } from '../../../../styles/defaultTheme';
import DrawerOverlay from '../DrawerOverlay/DrawerOverlay';
import FilteringReportingEmailsModal from './FIlteringReportingEmailsModal/FIlteringReportingEmailsModal';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import StatisticBar from '../StatisticBar/StatisticBar';

const getStatusIcon = (row, field) => {
  switch (true) {
    case !row.hasOwnProperty(field):
      return <WarningIcon />;
    case !row[field]:
      return <FailedIcon />;
    case row[field]:
      return <SuccessIcon />;
    default:
      return null;
  }
};

const data = [
  {
    label: 'Total emails sent:',
    value: 46,
  },
  {
    label: 'Total emails delivered:',
    value: '44 (95.65%)',
  },
  {
    label: 'Total emails opened:',
    value: '35 (76.09%)',
  },
];

const ReportingEmailTracker = () => {
  const table = useSortingTable(rows);
  const { selected, handleSelectAllClick } = table.selection;
  const { handleRequestSort } = table.sorting;
  const {
    page, pagesCount, rowsPerPage, handleChangePage, handleChangeRowsPerPage,
  } = table.pagination;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const handleClose = (e: SyntheticEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (!target.className.length) return;

    if (target.className.includes('overlay')) {
      toggleOpen();
    }
  };

  const [filteringDrawerOpen, setFilteringDrawerOpen] = useState(false);
  const handleFilteringDrawer = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // close just if click by overlay
    if (filteringDrawerOpen && ![...e.currentTarget.classList].includes('MuiBackdrop-root')) return;
    setFilteringDrawerOpen(!filteringDrawerOpen);
  };

  // to do
  // actions
  // sorting
  // table copy
  // search

  return (
    <Wrapper>
      <StatisticBar data={data} />
      <TableContent>
        <TableCaption>
          <p>
            <strong>{rows.length}</strong>
            {' '}
            Entries
          </p>
          <SearchBarWrapper className="search-wrapper">
            <SecondaryButton
              size="small"
              endIcon={<ShevronRight color={theme.colors.main.green} />}
            >
              Search & Advanced Filtering
            </SecondaryButton>
          </SearchBarWrapper>
        </TableCaption>
        <TableWrapper>
          <TableContainer>
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
                  <Row key={row.id}>
                    <TableCell className="message-id" onClick={() => alert('Message detail popup')}>
                      <a>{row.id}</a>
                    </TableCell>
                    <TableCell
                      className="message-to"
                      onClick={() => alert('Makes request by customer id')}
                    >
                      <a>{row.to}</a>
                    </TableCell>
                    <TableCell className="email">
                      <p>{row.email}</p>
                    </TableCell>
                    <TableCell className="message-title">
                      <p>{row.messageTitle}</p>
                    </TableCell>
                    <TableCell className="message-date-sent">
                      <p>{row.date}</p>
                    </TableCell>
                    <TableCell className="message-sent-by">
                      <p>{row.sentBy}</p>
                    </TableCell>
                    <TableCell className="message-delivered" title="add status">
                      {getStatusIcon(row, 'delivered')}
                    </TableCell>
                    <TableCell className="message-opened" title="add-status">
                      {getStatusIcon(row, 'opened')}
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
        {open
          ? createPortal(
            <Overlay onClick={handleClose} className="overlay">
              <ReportingEmailDetails />
            </Overlay>,
            document.body,
          )
          : null}
        <StyledDrawer anchor="right" open={filteringDrawerOpen} onClose={handleFilteringDrawer}>
          <DrawerOverlay handleClick={handleFilteringDrawer} handleKeydown={handleFilteringDrawer}>
            <FilteringReportingEmailsModal />
          </DrawerOverlay>
        </StyledDrawer>
      </TableContent>
    </Wrapper>
  );
};

export default ReportingEmailTracker;
