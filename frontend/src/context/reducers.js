import {actionTypes} from './actionTypes'

export const initialState = {
    username: '',
    email: '',
    popups: []
  };

export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SET_NAME:
        return { ...state, username: action.payload };
      case actionTypes.SET_EMAIL:
        return { ...state, email: action.payload };
      case actionTypes.SET_POPUP:
      return { ...state, popups: action.payload };
      default:
        return state;
    }
  };