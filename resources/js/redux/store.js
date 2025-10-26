import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import favouriteReducer from './FavouriteSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favourites'],
};

const rootReducer = combineReducers({
  favourites: favouriteReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);