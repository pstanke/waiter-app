import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { getTableById } from '../../../redux/tablesRedux';

export const SingleTable = () => {
  const { tableId } = useParams();
  const tableData = useSelector((state) => getTableById(state, tableId));
  if (!tableData) return <Navigate to='/' />;
  return <h1>Table {tableData.id}</h1>;
};
