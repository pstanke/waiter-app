//state
export const initialTableState = {
  data: [],
  requestStatus: {
    error: false,
    loading: false,
  },
  tableStatus: ['Free', 'Busy', 'Reserved', 'Cleaning'],
};

//selectors
export const getAllTables = (state) => state.tables.data;
export const getAllTableStatus = (state) => state.tables.tableStatus;
export const getTableById = (state, tableId) =>
  state.tables.data.find((table) => table.id === tableId);

// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const FETCH_START = createActionName('FETCH_START');
const FETCH_ERROR = createActionName('FETCH_ERROR');

// action creators
export const fetchStart = (payload) => ({ type: FETCH_START, payload });
export const fetchError = (payload) => ({ type: FETCH_ERROR, payload });

export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const fetchTables = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    fetch('http://localhost:3131/api/tables')
      .then((res) => res.json())
      .then((tables) => dispatch(updateTables(tables)))
      .catch((error) => {
        dispatch(fetchError(error.message || true));
      });
  };
};

export const editTable = (payload) => ({ type: EDIT_TABLE, payload });
export const editTableRequest = (payload) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(payload),
    };

    fetch('http://localhost:3131/tables/' + payload.id, options).then(() =>
      dispatch(editTable(payload))
    );
  };
};

export const TablesReducer = (statePart = initialTableState, action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return {
        ...statePart,
        requestStatus: { error: false, loading: false },
        data: action.payload,
      };

    case EDIT_TABLE:
      return {
        ...statePart,
        data: statePart.data.map((table) =>
          table.id === action.payload.id
            ? { ...table, ...action.payload }
            : table
        ),
      };

    case FETCH_START:
      return {
        ...statePart,
        requestStatus: { error: false, loading: true },
      };

    case FETCH_ERROR:
      return {
        ...statePart,
        requestStatus: { error: true, loading: false },
      };

    default:
      return statePart;
  }
};
