import {
    APOSTAS_SELECT_USUARIO
  } from '../actions/types';
  
  const INITIAL_STATE = {};

  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case APOSTAS_SELECT_USUARIO:
        console.log(action);
        return { ...state, apostas: action.payload };
      default:
        return state;
    }
  };