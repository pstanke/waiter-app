import { Form, Row, Col, Button } from 'react-bootstrap';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { getAllTableStatus } from '../../../redux/tablesRedux';

export const TableForm = ({ action, actionText, ...props }) => {
  const [status, setStatus] = useState(props.status || '');
  const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount || 0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(
    props.maxPeopleAmount || 10
  );
  const [bill, setBill] = useState(props.bill || 0);
  const id = props.id;

  const allStatus = useSelector(getAllTableStatus);

  const [statusError, setStatusError] = useState(false);

  if (peopleAmount > maxPeopleAmount && maxPeopleAmount > 0) {
    setPeopleAmount(maxPeopleAmount);
  }

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = (_, e) => {
    e.preventDefault();
    setStatusError(!status);
    if (status) {
      action({ status, peopleAmount, maxPeopleAmount, bill, id });
    }
  };

  return (
    <Form onSubmit={validate(handleSubmit)}>
      <Form.Group className='my-4'>
        <Row>
          <Col xs={'auto'} className='d-flex align-items-end'>
            <Form.Label>
              <strong>Status:</strong>
            </Form.Label>
          </Col>

          <Col xs={'auto'}>
            <Form.Select
              value={status ? status : 1}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option hidden>Select category</option>
              {allStatus.map((status, index) => (
                <option key={index}>{status}</option>
              ))}
            </Form.Select>
            {statusError && (
              <small className='d-block form-text text-danger mt-2'>
                This field is required
              </small>
            )}
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

          <Col xs={3} sm={2} lg={1}>
            <Form.Control
              {...register('peopleAmount', {
                required: true,
                min: 0,
                max: 10,
              })}
              value={
                status === 'Busy'
                  ? peopleAmount
                  : 0 || status === 'Reserved'
                  ? peopleAmount
                  : 0
              }
              onChange={(e) => setPeopleAmount(e.target.value)}
            ></Form.Control>
            {errors.peopleAmount && (
              <small className='d-block form-text text-danger mt-2'>
                min: 0, max: 10
              </small>
            )}
          </Col>

          <Col xs={'auto'} className='d-flex align-items-center'>
            /
          </Col>

          <Col xs={3} sm={2} lg={1}>
            <Form.Control
              {...register('maxPeopleAmount', {
                required: true,
                min: 0,
                max: 10,
              })}
              value={maxPeopleAmount}
              onChange={(e) => setMaxPeopleAmount(e.target.value)}
            ></Form.Control>
            {errors.maxPeopleAmount && (
              <small className='d-block form-text text-danger mt-2'>
                min: 0, max: 10
              </small>
            )}
          </Col>
        </Row>
      </Form.Group>

      {status === 'Busy' && (
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
                value={status === 'Busy' ? bill : 0}
                onChange={(e) => setBill(e.target.value)}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
      )}

      <Button variant='primary' type='submit'>
        {actionText}
      </Button>
    </Form>
  );
};
