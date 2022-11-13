import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTableRequest } from '../../../redux/tablesRedux';
import { TableForm } from '../../features/TableForm/TableForm';

export const AddTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (table) => {
    dispatch(addTableRequest(table));
    navigate('/');
  };

  return (
    <>
      <h1>New Table</h1>
      <TableForm action={handleSubmit} actionText='Add table' />
    </>
  );
};
