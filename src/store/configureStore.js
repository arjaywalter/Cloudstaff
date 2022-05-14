import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middleware/logger';
import rootReducer from './reducers';
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const reducers = rootReducer;
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const middlewares = [loggerMiddleware, thunkMiddleware];
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [...middlewares],
});

export default store;
