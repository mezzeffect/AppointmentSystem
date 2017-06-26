import configureStore from './configureStore';
import { persistStore } from 'redux-persist';
import * as User from '../reducers/user.reducer';
import * as Appointment from '../reducers/appointment.reducer';

// The top-level state object
export interface ApplicationState {
    user: User.UserState,
    appointment: Appointment.AppointmentState
    //counter: Counter.CounterState,
    //weatherForecasts: WeatherForecasts.WeatherForecastsState
}

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as ApplicationState;
export const store = configureStore(initialState);
persistStore(store, {
    whitelist: ['userReducer']
});