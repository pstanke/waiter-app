import { Button, Spinner } from 'react-bootstrap';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams, useNavigate } from 'react-router-dom';

import {
  editTableRequest,
  getAllTables,
  getTableById,
  removeTableRequest,
} from '../../../redux/tablesRedux';
import { TableForm } from '../TableForm/TableForm';
import { ModalElem } from '../../common/ModalElem/ModalElem';

export const EditTableForm = () => {
  const { tableId } = useParams();
  const tableData = useSelector(({ tables }) =>
    getTableById({ tables }, tableId)
  );
  const allTables = useSelector(getAllTables);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (tableId) => {
    dispatch(removeTableRequest(tableId));
    navigate('/');
  };

  const handleSubmit = (table) => {
    dispatch(editTableRequest({ ...table }));
    navigate('/');
  };

  if (!tableData && allTables.length) {
    return <Navigate to='/' />;
  }
  if (!allTables.length) {
    return <Spinner animation='border' variant='primary' />;
  }
  return (
    <>
      <h1>Table {tableData.id}</h1>
      <TableForm
        action={handleSubmit}
        actionText='Update'
        id={tableId}
        status={tableData.status}
        peopleAmount={tableData.peopleAmount}
        maxPeopleAmount={tableData.maxPeopleAmount}
        bill={tableData.bill}
      />
      <Button variant='outline-danger' className='mt-4' onClick={handleShow}>
        Delete table
      </Button>
      <ModalElem
        show={show}
        handleClose={handleClose}
        modalText='This operation will completely remove this table from the app.'
        actionText='Delete'
        func={handleDelete}
        data={tableId}
      ></ModalElem>
    </>
  );
};
