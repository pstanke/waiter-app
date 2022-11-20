import shortid from 'shortid';
import { API_URL } from '../config.js';

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
export const getTableById = (state, id) =>
  state.tables.data.find((table) => table.id === id);

// actions
const createActionName = (actionName) => `app/table/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const ADD_TABLE = createActionName('ADD_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');
const FETCH_START = createActionName('FETCH_START');
const FETCH_ERROR = createActionName('FETCH_ERROR');

// action creators
export const fetchStart = (payload) => ({ type: FETCH_START, payload });
export const fetchError = (payload) => ({ type: FETCH_ERROR, payload });

export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const fetchTables = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    fetch(`${API_URL}/tables`)
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

    const url = `${API_URL}/tables/${payload.id}`;

    fetch(url, options).then(() => dispatch(editTable(payload)));
  };
};

export const addTable = (payload) => ({ type: ADD_TABLE, payload });
export const addTableRequest = (payload) => {
  return (dispatch) => {
    const options = {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(payload),
    };

    fetch(`${API_URL}/tables`, options).then(() => dispatch(addTable(payload)));
  };
};

export const removeTable = (payload) => ({ type: REMOVE_TABLE, payload });
export const removeTableRequest = (payload) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
      },
    };

    const url = `${API_URL}/tables/${payload}`;

    fetch(url, options).then(() => dispatch(removeTable(payload)));
  };
};

export const tablesReducer = (statePart = initialTableState, action) => {
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

    case ADD_TABLE:
      return {
        ...statePart,
        data: [statePart.data, { ...action.payload, id: shortid() }],
      };

    case REMOVE_TABLE:
      return {
        ...statePart,
        data: statePart.data.filter((table) => table.id !== action.payload),
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
