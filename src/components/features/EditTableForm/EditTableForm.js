import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { editTableRequest, getTableById } from '../../../redux/tablesRedux';
import { TableForm } from '../TableForm/TableForm';

export const EditTableForm = () => {
  const { tableId } = useParams();
  const tableData = useSelector(({ tables }) =>
    getTableById({ tables }, tableId)
  );

  const dispatch = useDispatch();
  const handleSubmit = (table) => {
    dispatch(editTableRequest({ ...table, tableId }));
  };

  if (!tableData) return <Navigate to='/' />;
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
    </>
  );
};
