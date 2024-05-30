import { actionTypes } from "./actionTypes";

export const setName = (username) => {
    return {
      type: actionTypes.SET_NAME,
      payload: username,
    };
  };
  
  export const setEmail = (email) => {
    return {
      type: actionTypes.SET_EMAIL,
      payload: email,
    };
  };

  export const setPopup = (popups) => {
    return {
      type: actionTypes.SET_POPUP,
      payload: popups
    }
    

  }