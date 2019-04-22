import firebase from 'firebase';

import {
    APOSTA_REALIZADA_SUCCESS
  } from './types';

  export const apostaRealizada = ({isVivo, isKing, personagemId}) => {
    const  currentUser = firebase.auth().currentUser.uid;

    return async (dispatch) => {
        if(isKing){
          firebase.database().ref(`Apostas/${currentUser}`).update({Rei: personagemId});
          firebase.database().ref(`Apostas/${currentUser}/${personagemId}`).set({isVivo: true});
        }else{
          firebase.database().ref(`Apostas/${currentUser}/${personagemId}`).set({isVivo});
        }
        dispatch({
          type: APOSTA_REALIZADA_SUCCESS,
          payload: { currentUser, isVivo, isKing, personagemId }
        });
    }
  };