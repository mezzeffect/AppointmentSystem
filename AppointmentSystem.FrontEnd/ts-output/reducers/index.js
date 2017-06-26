import { combineReducers } from 'redux';
import user from './user.reducer';
import appointment from './appointment.reducer';
const rootReducer = combineReducers({
    user,
    appointment
});
export default rootReducer;
//# sourceMappingURL=index.js.map