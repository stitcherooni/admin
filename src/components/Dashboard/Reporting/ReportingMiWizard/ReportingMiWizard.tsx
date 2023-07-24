import React, { SyntheticEvent, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {
  Wrapper,
  FiltersWrapper,
  Col,
  RunReportButton,
  TableContent,
  Head,
  TableCell,
} from './ReportingMiWizard.styled';
import ButtonArrowRounded from '../../../../assets/icons/button-arrow-rounded';
import {
  Row,
  SearchBarWrapper,
  SearchInput,
  SortButton,
  StyledCheckbox,
  TableCaption,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import ZoomIconSmall from '../../../../assets/icons/zoom-icon-small';
import { SecondaryButton } from '../../../shared/Buttons/Buttons.styled';
import ButtonIconPdf from '../../../../assets/icons/button-icon-pdf';
import { useSortingTable } from '../../../shared/Table/utils';
import DeleteIcon from '../../../../assets/icons/delete-icon';
import ListEditIcon from '../../../../assets/icons/list-edit-icon';
import { headCells, rows } from './table-data';
import { Overlay } from '../Reporting.styled';
import Label from '../../../shared/Label/Label';
import Select from '../../../shared/Select/Select';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';

const ReportingMiWizard = () => {
  const table = useSortingTable(rows);
  const {
    selected, handleSelectAllClick, handleClick, checkIsSelected,
  } = table.selection;
  const { handleRequestSort } = table.sorting;
  const {
    page, pagesCount, rowsPerPage, handleChangePage, handleChangeRowsPerPage, pageSizes,
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

  return (
    <Wrapper>
      <FiltersWrapper>
        <Col>
          <Label content={{} as any} text="Show me the ..." inputId="show" />
          <Select name="show" options={[]} />
        </Col>
        <Col>
          <Label content={{} as any} text="By ..." inputId="by" />
          <Select name="by" options={[]} />
        </Col>
        <Col>
          <Label content={{} as any} text="In ..." inputId="in" />
          <Select name="in" options={[]} />
        </Col>
        <Col className="run-report">
          <RunReportButton endIcon={<ButtonArrowRounded />}>Run Report</RunReportButton>
        </Col>
      </FiltersWrapper>
      <TableContent>
        <TableCaption>
          <p>
            <strong>32</strong>
            {' '}
            Events
          </p>
          <SearchBarWrapper className="search-wrapper">
            <SearchInput
              placeholder="Search by name, customer ID, email, postcode etc"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ZoomIconSmall />
                  </InputAdornment>
                ),
              }}
              className="search-input"
            />
            <SecondaryButton size="small">Customise View</SecondaryButton>
            <SecondaryButton size="small" endIcon={<ButtonIconPdf />}>
              Export PDF
            </SecondaryButton>
          </SearchBarWrapper>
        </TableCaption>
        <TableWrapper>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
              <Head
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={32}
                cells={headCells}
                className="table-head"
              />
              <TableBody>
                {table.visibleRows.map((row, index) => {
                  const isItemSelected = checkIsSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <Row
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell className="checkbox">
                        <StyledCheckbox
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell className="event-name">
                        <p>{row.eventName}</p>
                      </TableCell>
                      <TableCell className="pta-name">
                        <p>{row.ptaName}</p>
                      </TableCell>
                      <TableCell className="pupils">
                        <p>{row.pupils}</p>
                      </TableCell>
                      <TableCell className="date">
                        <p>{row.date}</p>
                      </TableCell>
                      <TableCell className="orders">
                        <p>{`${row.count} / ${row.currency}${row.amount}`}</p>
                      </TableCell>
                      <TableCell className="actions">
                        <Link to={`/dashboard/events/${row.id}`}>
                          <SortButton disableRipple>
                            <ListEditIcon />
                          </SortButton>
                        </Link>
                        <SortButton disableRipple onClick={toggleOpen} className="remove-button">
                          <DeleteIcon className="remove-button" />
                        </SortButton>
                      </TableCell>
                    </Row>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            pagesCount={pagesCount}
            rowsPerPage={rowsPerPage}
            options={pageSizes}
          />
        </TableWrapper>
      </TableContent>
      {open
        ? createPortal(
          <Overlay onClick={handleClose} className="overlay">
            {/* <DeleteConfirmationModal
                deleteItemName={namesToDelete}
                confirm={console.log}
                cancel={console.log}
              /> */}
          </Overlay>,
          document.body,
        )
        : null}
    </Wrapper>
  );
};

export default ReportingMiWizard;
