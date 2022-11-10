import { Alert, Col, Row, Spinner } from 'react-bootstrap';

import { useSelector } from 'react-redux';

import { AllTables } from '../../features/AllTables/AllTables';

export const Home = () => {
  const { error, loading } = useSelector(({ tables }) => tables.requestStatus);

  return (
    <>
      <Row>
        <Col>
          <h1>All Tables</h1>
        </Col>
        {!loading && !error && <AllTables />}
      </Row>
      {loading && !error && <Spinner animation='border' variant='primary' />}
      {error && !loading && <Alert variant='danger'>ERROR!</Alert>}
    </>
  );
};
