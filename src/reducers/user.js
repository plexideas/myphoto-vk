import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/UserActions";

export const initialState = {
  name: '',
  error: '',
  isFetching: false,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: //#endregion
      return {...state, isFetching: true, error: ''};

    case LOGIN_SUCCESS: //#endregion
      return {...state, isFetching: false, name: action.payload};

    case LOGIN_FAILURE: //#endregion
      return {...state, isFetching: false, error: action.payload.message};
      
    default: return state;
  }
};