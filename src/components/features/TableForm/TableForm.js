import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form, Row, Col, Button } from 'react-bootstrap';

import { getAllStatus } from '../../../redux/statusRedux';
import { editTableRequest } from '../../../redux/tablesRedux';

export const TableForm = ({ ...props }) => {
  const [status, setStatus] = useState(props.status);
  const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount);
  const [bill, setBill] = useState(props.bill);

  const id = props.id;

  const dispatch = useDispatch();
  const allStatus = useSelector(getAllStatus);

  const handleSubmit = () => {
    dispatch(
      editTableRequest({ status, peopleAmount, maxPeopleAmount, bill, id })
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='my-4'>
        <Row>
          <Col xs={'auto'} className='d-flex align-items-end'>
            <Form.Label>
              <strong>Status:</strong>
            </Form.Label>
          </Col>

          <Col xs={'auto'}>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {allStatus.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className='my-4'>
        <Row>
          <Col xs={'auto'} className='d-flex align-items-end'>
            <Form.Label>
              <strong>People:</strong>
            </Form.Label>
          </Col>

          <Col xs={3} sm={2} md={1}>
            <Form.Control
              value={peopleAmount}
              onChange={(e) => setPeopleAmount(e.target.value)}
            ></Form.Control>
          </Col>

          <Col xs={'auto'} className='d-flex align-items-center'>
            /
          </Col>

          <Col xs={3} sm={2} md={1}>
            <Form.Control
              value={maxPeopleAmount}
              onChange={(e) => setMaxPeopleAmount(e.target.value)}
            ></Form.Control>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className='my-4'>
        <Row>
          <Col xs={'auto'} className='d-flex align-items-end'>
            <Form.Label>
              <strong>Bill:</strong>
            </Form.Label>
          </Col>

          <Col xs={'auto'} className='d-flex align-items-center'>
            $
          </Col>

          <Col xs={3} sm={2}>
            <Form.Control
              value={bill}
              onChange={(e) => setBill(e.target.value)}
            ></Form.Control>
          </Col>
        </Row>
      </Form.Group>
      <Button variant='primary' type='submit'>
        Update
      </Button>
    </Form>
  );
};
