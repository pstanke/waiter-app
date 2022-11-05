//selectors
export const getAllTables = (state) => state.tables;
export const getTableById = ({ tables }, tableId) =>
  tables.find((table) => table.id === tableId);

// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');

// action creators
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tables')
      .then((res) => res.json())
      .then((tables) => dispatch(updateTables(tables)));
  };
};
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });
export const editTableRequest = (payload) => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        ...payload,
      }),
    };

    fetch('http://localhost:3131/tables/' + payload.id, options).then(() =>
      dispatch(editTable(payload))
    );
  };
};

export const TablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case EDIT_TABLE:
      return statePart.map((table) =>
        table.id === action.payload.id ? { ...table, ...action.payload } : table
      );
    default:
      return statePart;
  }
};
