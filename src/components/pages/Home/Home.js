import { Col, Row } from 'react-bootstrap';
import { AllTables } from '../../features/AllTables/AllTables';

export const Home = () => {
  return (
    <>
      <Row>
        <Col>
          <h1>All Tables</h1>
        </Col>
        <AllTables />
      </Row>
    </>
  );
};
