import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FacebookReducer from './FacebookReducer';
import UserDataReducer from './UserDataReducer';
import ApostasReducer from './ApostasReducer';


export default combineReducers({
  auth: AuthReducer,
  fbauth: FacebookReducer,
  userdata: UserDataReducer,
  apostas: ApostasReducer
});
