import firebase from 'firebase';

import {
    APOSTA_REALIZADA_SUCCESS, 
    APOSTAS_SELECT_USUARIO
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

  export const apostasUsuario = () => {
    const  currentUser = firebase.auth().currentUser.uid;

    return (dispatch) => {
        firebase.database().ref(`Apostas/${currentUser}`).on('value', snapshot => {
          const dados = snapshot.val();
          console.log(dados);

          dispatch({ type: APOSTAS_SELECT_USUARIO, apostas: dados });
        });
    }
  }