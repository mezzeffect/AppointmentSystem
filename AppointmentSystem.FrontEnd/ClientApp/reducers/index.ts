import { combineReducers, Reducer } from 'redux'
import user from './user.reducer';
import appointment from './appointment.reducer';
import * as Store from '../store';

const rootReducer = combineReducers<Store.ApplicationState>({
    user,
    appointment
});

export default rootReducer;