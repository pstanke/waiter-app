import { Button, ListGroup, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getAllTables } from '../../../redux/tablesRedux';
import styles from './AllTables.module.scss';

export const AllTables = () => {
  const tables = useSelector(getAllTables);

  return (
    <ListGroup variant='flush'>
      {tables.map((table) => (
        <ListGroup.Item key={table.id} className={styles}>
          <Row className='my-2'>
            <Col className='d-flex justify-content-start' xs={2}>
              <h3>Table {table.id}</h3>
            </Col>

            <Col className='d-flex align-items-center'>
              <strong>Status:</strong>
              <span className={styles[table.status]}>{table.status}</span>
            </Col>

            <Col className='d-flex justify-content-end '>
              <Button as={Link} to={'table/' + table.id}>
                Show more
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
