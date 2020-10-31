import { createStore, combineReducers } from 'redux';
import profileReducer from './profile/reducer';
import { RootState } from '../domain/entity/rootState';

const store = createStore(
  // combineReducersAPIを使用してreducerを一つにまとめたものをcreateStoreに食わせることでstoreとなる
  combineReducers<RootState>({
    profile: profileReducer,
  }),
  // redux dev tools を使用するための記述
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
