import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardIconOutlined from '../../assets/icons/dashboard-icon-outlined';
import {
  StyledBreadcrumbs, Title, TitleWrapper, Wrapper,
} from './PageHeader.styled';
import ReportingIconRounded from '../../assets/icons/reporting-icon-rounded';

interface PageHeaderProps {
  buttons?: React.ReactNode;
  className?: string;
}

const PageHeader = (props: PageHeaderProps) => {
  const location = useLocation();
  const breadCrumbsData = useMemo(() => {
    switch (true) {
      case location.pathname === '/':
      case location.pathname === '/dashboard':
        return ['Dashboard'];
      case location.pathname === '/dashboard/reporting':
        return ['Dashboard', 'Reporting'];
      default: return [];
    }
  }, [location.pathname]);

  const pageIcon = useMemo(() => {
    switch (true) {
      case location.pathname === '/':
      case location.pathname === '/dashboard':
        return <DashboardIconOutlined />;
      case location.pathname === '/dashboard/reporting':
        return <ReportingIconRounded />;
      default: return null;
    }
  }, [location.pathname]);

  return (
    <Wrapper className={props.className}>
      <div>
        <TitleWrapper>
          {pageIcon || null}
          <Title>{breadCrumbsData[breadCrumbsData.length - 1]}</Title>
        </TitleWrapper>
        <StyledBreadcrumbs>
          <strong>Home</strong>
          {breadCrumbsData.map((item) => <p key={item}>{item}</p>)}
        </StyledBreadcrumbs>
      </div>
      {props.buttons}
    </Wrapper>
  );
};

PageHeader.defaultProps = {
  buttons: null,
  className: '',
};

export default PageHeader;