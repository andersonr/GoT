import firebase from 'firebase';

import {
    APOSTA_REALIZADA_SUCCESS
  } from './types';

  export const apostaRealizada = ({isVivo, isKing, personagemId}) => {
    const { currentUser } = firebase.auth().uid;

    return async (dispatch) => {
        dispatch({
          type: APOSTA_REALIZADA_SUCCESS,
          payload: { currentUser, isVivo, isKing, personagemId }
        });
    }
  };