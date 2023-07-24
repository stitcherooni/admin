import React, { useState } from 'react';
import {
  Col,
  ButtonsWrapper,
  Filters,
  FiltersWrapper,
  TableContent,
  Wrapper,
  SearchBarWrapper,
} from './ReportingProductQuestions.styled';
import {
  TableCaption,
} from '../../../shared/Table/Table.styled';
import CustomizerMenu from '../../../shared/CustomizerMenu/CustomizerMenu';
import { SecondaryButton } from '../../../shared/Buttons/Buttons.styled';
import ButtonIconPdf from '../../../../assets/icons/button-icon-pdf';
import ReportingProductTableHorizontal from './ReportingProductTableHorizontal/ReportingProductTableHorizontal';
import ReportingProductTableVertical from './ReportingProductTableVertical/ReportingProductTableVertical';
import { rows } from './ReportingProductTableHorizontal/table-data';
import { fakeState } from '../../Dashboard';
import { eventOptions, menuActionsOptions, productsOptions } from './table-data';
import ReportingMenu from '../ReportingMenu/ReportingMenu';
import Label from '../../../shared/Label/Label';
import NestedMenu from '../../../shared/NestedMenu/NestedMenu';
import Select from '../../../shared/Select/Select';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';

interface Filter {
  value: number | string;
  label: number | string;
}

interface EventFilter extends Filter {
  year: number | string;
}

interface ReportingFilters {
  event?: EventFilter;
  product?: string;
  groupBy?: string;
}

const formatOptions = [
  {
    value: 'horizontal',
    label: 'Horizontal',
  },
  {
    value: 'vertical',
    label: 'Vertical',
  },
];

const ReportingProductQuestions = () => {
  const [format, setTableFormat] = useState('vertical');
  const handleChangeTableFormat = (e) => setTableFormat(e.target.value);
  const [filters, setSelectedFilters] = useState<ReportingFilters>({
    event: {
      value: '',
      label: '',
      year: '',
    },
    product: '',
    groupBy: '',
  });

  const handleChooseEvent = (e) => {
    const { value, label, rootid } = e.currentTarget.dataset;
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      event: {
        value,
        label,
        year: rootid,
      },
    }));
  };

  const handleSelectFilters = (e, type: string) => {
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      [type]: e.target.value,
    }));
  };

  const handleEventChange = (e) => handleChooseEvent(e);
  const handleProductChange = (e) => handleSelectFilters(e, 'product');
  const handleGroupByChange = (e) => handleSelectFilters(e, 'groupBy');

  // to do
  // sorting
  // table copy
  // search
  // add button show test answers,
  // when click by the button we need to show warning 'Warning: You are viewing test answers

  return (
    <Wrapper>
      <Filters>
        <div>
          <Label text="Product Questions Selection" content={{}} inputId="ticket" />
          <FiltersWrapper>
            <Col>
              <p className="filter-title">Event</p>
              <NestedMenu
                options={eventOptions}
                rootId={!filters?.event ? null : filters?.event.year}
                buttonLabel={!filters?.event ? null : filters?.event.label}
                selectedId={!filters?.event ? null : filters?.event.value}
                handleChoose={handleEventChange}
              />
            </Col>
            <Col>
              <p className="filter-title">Product</p>
              <Select
                options={productsOptions}
                value={filters?.product}
                onChange={handleProductChange}
                placeholder="Select Product"
              />
            </Col>
            <Col>
              <p className="filter-title">Group By</p>
              <Select
                options={formatOptions}
                value={filters?.groupBy}
                onChange={handleGroupByChange}
                placeholder="Group By"
              />
            </Col>
          </FiltersWrapper>
        </div>
        <div>
          <ButtonsWrapper />
          <SearchBarWrapper className="search-wrapper">
            <ActionsMenu options={menuActionsOptions} />
          </SearchBarWrapper>
        </div>
      </Filters>
      <TableContent>
        <TableCaption>
          <p>
            <strong>{rows.length}</strong>
            {` ${rows.length === 0 || rows.length > 1 ? 'Entries' : 'Entry'}`}
          </p>
        </TableCaption>
        {format === 'horizontal' ? <ReportingProductTableHorizontal /> : <ReportingProductTableVertical />}
      </TableContent>
    </Wrapper>
  );
};

export default ReportingProductQuestions;
