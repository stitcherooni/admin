import React, {
  SyntheticEvent, useCallback, useEffect, useMemo, useState,
} from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { createPortal } from 'react-dom';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  TableCell, TableContent, Head, Wrapper, RowButton, ApproveModalOverlay, StyledAlert,
} from './ReportingCustomers.styled';
import {
  Row,
  SearchBarWrapper,
  TableCaption,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import {
  headCells, menuActionsOptions, rows,
} from './table-data';
import { Overlay, StyledDrawer } from '../Reporting.styled';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';
import DrawerOverlay from '../DrawerOverlay/DrawerOverlay';
import FilteringReportingCustomersModal from './FIlteringReportingCustomersModal/FIlteringReportingOrdersModal';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import ApproveCustomerModal from './ApproveCustomerModal/ApproveCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal/DeleteCustomerModal';
import StatisticBar from '../StatisticBar/StatisticBar';
import { AppDispatch, RootState } from '../../../../redux/store';
import { getCustomersStat, toggleApproveCustomer } from '../../../../redux/actions/reporting.actions';
import { getCurrencyByCode } from '../../../../utils/currency';
import { CustomerStatItem } from '../../../../types/reporting/customers';
import { handleCloseModal } from '../../../../utils/modals';
import LoadingOverlay from '../../../shared/LoadingOverlay/LoadingOverlay';
import MessageIcon from '../../../../assets/icons/message-icon';
import DeleteIcon from '../../../../assets/icons/delete-icon';
import { theme } from '../../../../styles/defaultTheme';

const ReportingCustomers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const customersData = useSelector((state: RootState) => state.reporting.customers);
  const table = useSortingTable<CustomerStatItem>(customersData.data, {
    columns: headCells,
    totalCount: customersData.data.length,
  });
  const { selected, handleSelectAllClick } = table.selection;
  const { handleRequestSort } = table.sorting;
  const {
    page, pagesCount, rowsPerPage, totalRows, handleChangePage, handleChangeRowsPerPage,
  } = table.pagination;
  const { updateSearchText } = table.search;

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerStatItem | null>(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const toggleOpenDeleteModal = (customer?: CustomerStatItem) => {
    setSelectedCustomer(customer ?? null);
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleCloseDeletePopup = (e: SyntheticEvent<HTMLDivElement>) => {
    handleCloseModal(e, toggleOpenDeleteModal);
  };

  const [openApprovalModal, setOpenApprovalModal] = useState(false);

  const toggleOpenApprovalModal = (customer?: CustomerStatItem) => {
    setSelectedCustomer(customer ?? null);
    setOpenApprovalModal(!openApprovalModal);
  };

  const handleCloseApprovalModal = (e: SyntheticEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (!target.className.length) return;

    if (target.className.includes('overlay')) {
      toggleOpenApprovalModal();
    }
  };

  const [filteringDrawerOpen, setFilteringDrawerOpen] = useState(false);
  const handleFilteringDrawer = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // close just if click by overlay
    if (filteringDrawerOpen && ![...e.currentTarget.classList].includes('MuiBackdrop-root')) return;
    setFilteringDrawerOpen(!filteringDrawerOpen);
  };

  const statistic = useMemo(
    () => [
      {
        label: 'Total Customers:',
        value: customersData.customersCount,
      },
      {
        label: 'Total Orders:',
        value: customersData.totalOrdersNumber,
      },
      {
        label: 'Total Order Value:',
        value: `${getCurrencyByCode(
          customersData.currency,
          !customersData.totalOrderValue ? 0 : customersData.totalOrderValue,
        )}`,
      },
    ],
    [customersData.totalOrderValue, customersData.totalOrdersNumber, customersData.customersCount],
  );

  const handleApproveCustomer = () => {
    if (!selectedCustomer) return;
    dispatch(toggleApproveCustomer({
      userId: selectedCustomer?.id,
      isApprove: !selectedCustomer?.approved,
    }));
    setOpenApprovalModal(false);
  };

  const [params] = useSearchParams();

  const urlQuery = useMemo(() => {
    const query = {};
    if (!params.size) return null;
    for (const param of params.entries()) {
      query[param[0]] = param[1];
    }

    return query;
  }, [params]);

  useEffect(() => {
    if (urlQuery) {
      dispatch(getCustomersStat(urlQuery));
    }
  }, [urlQuery]);

  const menuActions = useMemo(() => menuActionsOptions.map((item) => {
    switch (item.value) {
      case 'search':
        return {
          ...item,
          handleClick: () => {
            setFilteringDrawerOpen(true);
          },
        };
    }

    return item;
  }), [menuActionsOptions]);

  // to do
  // actions (approve, remove, tinymce integration)
  // sorting
  // table copy
  // search

  // needs fields: approved, currency
  // need separate value for total customers count

  return customersData.status === 'loading' ? <LoadingOverlay /> : (
    <Wrapper>
      {customersData?.error ? (
        <StyledAlert type="error" className="customers-error">
          {process.env.NODE_ENV === 'development' ? customersData?.error : 'Something went wrong'}
        </StyledAlert>
      ) : null}
      {!customersData?.error && customersData.message ? (
        <StyledAlert type="success" className="customers-error">
          {customersData?.message}
        </StyledAlert>
      ) : null}
      <StatisticBar data={statistic} />
      <TableContent>
        <TableCaption>
          <p>
            <strong>{`${totalRows} `}</strong>
            {`${
              totalRows === 0 || totalRows > 1
                ? 'Customers'
                : 'Customer'
            }`}
          </p>
          <SearchBarWrapper className="search-wrapper">
            <ActionsMenu options={menuActions} />
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
                  <Row
                    tabIndex={-1}
                    key={row.num}
                  >
                    <TableCell className="row-id">
                      <p>{row.num}</p>
                    </TableCell>
                    <TableCell className="id">
                      <Link to={`/dashboard/customers/${row.id}`}>{row.id}</Link>
                    </TableCell>
                    <TableCell className="first-name">
                      <p>{row.firstName}</p>
                    </TableCell>
                    <TableCell className="last-name">
                      <p>{row.lastName}</p>
                    </TableCell>
                    <TableCell className="date">
                      <p>{dayjs(row.date).format('DD/MM/YYYY HH:mm')}</p>
                    </TableCell>
                    <TableCell className="approved">
                      <RowButton onClick={() => toggleOpenApprovalModal(row)}>{row.approved ? 'Yes' : 'No'}</RowButton>
                    </TableCell>
                    <TableCell className="send-email">
                      <Link to={`/dashboard/listings?type=customer-email&to=${row.firstName} ${row.lastName}`}>
                        <RowButton startIcon={<MessageIcon color={theme.colors.main.green} />} />
                      </Link>
                    </TableCell>
                    <TableCell className="delete-customer">
                      <RowButton
                        startIcon={<DeleteIcon color={theme.colors.main.green} />}
                        onClick={() => toggleOpenDeleteModal(row)}
                      />
                    </TableCell>
                    <TableCell className="orders">
                      <p>{row.orders}</p>
                    </TableCell>
                    <TableCell className="order-value">
                      <p>{`${getCurrencyByCode(customersData.currency, row.value)}`}</p>
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
      {openDeleteModal
        ? createPortal(
          <Overlay onClick={handleCloseDeletePopup} className="overlay">
            <DeleteCustomerModal
              firstName={selectedCustomer?.firstName ?? ''}
              lastName={selectedCustomer?.lastName ?? ''}
              userId={selectedCustomer?.id ?? 0}
              cancel={toggleOpenDeleteModal}
            />
          </Overlay>,
          document.body,
        )
        : null}
      {openApprovalModal
        ? createPortal(
          <Overlay onClick={handleCloseApprovalModal} className="overlay">
            <ApproveModalOverlay
              confirm={handleApproveCustomer}
              cancel={toggleOpenApprovalModal}
              confirmButtonName={!selectedCustomer?.approved ? 'Approve' : 'Unapprove'}
              cancelButtonName="Cancel"
              className="approve-modal"
            >
              <ApproveCustomerModal
                type={!selectedCustomer?.approved ? 'approve' : 'unapprove'}
                firstName={selectedCustomer?.firstName ?? ''}
                lastName={selectedCustomer?.lastName ?? ''}
                userId={selectedCustomer?.id ?? 0}
              />
            </ApproveModalOverlay>
          </Overlay>,
          document.body,
        )
        : null}
      <StyledDrawer anchor="right" open={filteringDrawerOpen} onClose={handleFilteringDrawer}>
        <FilteringReportingCustomersModal
          updateSearchText={updateSearchText}
          handleClose={setFilteringDrawerOpen}
        />
      </StyledDrawer>
    </Wrapper>
  );
};

export default ReportingCustomers;
