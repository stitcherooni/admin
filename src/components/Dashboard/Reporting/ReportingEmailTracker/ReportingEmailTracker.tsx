import React, {
  ChangeEvent, SyntheticEvent, useMemo, useState,
} from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import dayjs from 'dayjs';
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
import { AppDispatch, RootState } from '../../../../redux/store';
import { EmailTrackerItem } from '../../../../types/reporting/emailTracker';
import { getEmailTrackerStat } from '../../../../redux/actions/reporting.actions';
import { handleCloseModal } from '../ReportingBooking/utils';

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

const ReportingEmailTracker = () => {
  const dispatch = useDispatch<AppDispatch>();
  const emailtrackerData = useSelector((state: RootState) => state.reporting.emailTracker);
  const table = useSortingTable<EmailTrackerItem>(emailtrackerData.data, {
    totalCount: emailtrackerData.totalCount,
    totalPages: emailtrackerData.totalPages,
    pageSize: emailtrackerData.pageSize,
    currentPage: emailtrackerData.currentPage,
  });
  const { selected, handleSelectAllClick } = table.selection;
  const { handleRequestSort } = table.sorting;
  const { page, pagesCount, rowsPerPage } = table.pagination;

  const changePage = (e: ChangeEvent, newPage?: number) => {
    e.preventDefault();
    dispatch(
      getEmailTrackerStat({
        page: newPage,
        pageSize: rowsPerPage,
      }),
    );
  };

  const changeRowsPerPage = (e: SelectChangeEvent<unknown>) => {
    dispatch(
      getEmailTrackerStat({
        page: 1,
        pageSize: parseInt((e.target as HTMLSelectElement).value, 10),
      }),
    );
  };

  const [openEmailDetails, setOpenEmailDetails] = useState(false);
  const [emailDetails, setEmailDetails] = useState<EmailTrackerItem | null>(null);

  const toggleOpenEmailDetails = () => setOpenEmailDetails(!openEmailDetails);

  const handleCloseEmailDetails = (e: SyntheticEvent<HTMLDivElement>) => {
    handleCloseModal(e, toggleOpenEmailDetails);
    setEmailDetails(null);
  };

  const selectEmailDetail = (detail: EmailTrackerItem) => {
    setEmailDetails(detail);
    toggleOpenEmailDetails();
  };

  const [filteringDrawerOpen, setFilteringDrawerOpen] = useState(false);
  const handleFilteringDrawer = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // close just if click by overlay
    if (filteringDrawerOpen && ![...e.currentTarget.classList].includes('MuiBackdrop-root')) return;
    setFilteringDrawerOpen(!filteringDrawerOpen);
  };

  const statistic = useMemo(() => {
    const { totalEmailsSent, totalEmailsDelivered, totalEmailsOpened } = emailtrackerData;

    return [
      {
        label: 'Total emails sent:',
        value: totalEmailsSent,
      },
      {
        label: 'Total emails delivered:',
        value:
          totalEmailsSent === totalEmailsDelivered
            ? `${totalEmailsDelivered} (100%)`
            : `${totalEmailsDelivered} (${(totalEmailsDelivered / totalEmailsSent) * 100}%)`,
      },
      {
        label: 'Total emails opened:',
        value:
          totalEmailsSent === totalEmailsOpened
            ? `${totalEmailsOpened} (100%)`
            : `${totalEmailsOpened} (${(totalEmailsOpened / totalEmailsSent) * 100}%)`,
      },
    ];
  }, [emailtrackerData]);

  // to do
  // actions
  // sorting
  // table copy
  // search

  return (
    <Wrapper>
      <StatisticBar data={statistic} />
      <TableContent>
        <TableCaption>
          <p>
            <strong>{`${emailtrackerData.totalCount} `}</strong>
            {`${
              emailtrackerData.totalCount === 0 || emailtrackerData.totalCount > 1
                ? 'Entries'
                : 'Entry'
            }`}
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
                  <Row key={row.num}>
                    <TableCell className="message-id" onClick={() => selectEmailDetail(row)}>
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
                    <TableCell className="message-sent-by">
                      <p>{row.sentBy}</p>
                    </TableCell>
                    <TableCell className="message-date-sent">
                      <p>{dayjs(row.dateSent).format('DD/MM/YYYY HH:MM')}</p>
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
            handleChangePage={changePage}
            handleChangeRowsPerPage={changeRowsPerPage}
            page={page}
            pagesCount={pagesCount}
            rowsPerPage={rowsPerPage}
            options={[5, 10, 25]}
          />
        </TableWrapper>
        {openEmailDetails
          ? createPortal(
            <Overlay onClick={handleCloseEmailDetails} className="overlay">
              <ReportingEmailDetails data={emailDetails} />
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
