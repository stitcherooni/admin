import React, { useState } from 'react';
import { Col, ChooseReportWrapper, Wrapper } from './Reporting.styled';
import { tabsList } from './tabs';
import { getReportComponent } from './utils';
import Label from '../../shared/Label/Label';
import Select from '../../shared/Select/Select';

const Reporting = () => {
  const [activeReportType, setActiveReportType] = useState('volunteers');

  const handleChangeReportType = (e) => setActiveReportType(e.target.value);

  return (
    <Wrapper>
      <ChooseReportWrapper>
        <Label text="Report Selection" content={{}} inputId="choose-report" />
        <Col>
          <p>Choose your report</p>
          <Select name="show" options={tabsList} value={activeReportType} onChange={handleChangeReportType} />
        </Col>
      </ChooseReportWrapper>
      {getReportComponent(activeReportType)}
    </Wrapper>
  );
};

export default Reporting;
