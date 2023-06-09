/* eslint-disable arrow-body-style */
import React from 'react';
import Layout from '../layouts/BasicLayout/BasicLayout';

interface IndexPageProps {
  children: React.ReactElement;
}

const IndexPage = (props: IndexPageProps) => {
  return (
    <Layout>
      { props.children }
    </Layout>
  );
};

export default IndexPage;
