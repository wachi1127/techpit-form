import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import profileReducer from './profile/reducer';
import { RootState } from '../domain/entity/rootState';

const store = createStore(
  // combineReducersAPIを使用してreducerを一つにまとめたものをcreateStoreに食わせることでstoreとなる
  combineReducers<RootState>({
    profile: profileReducer,
  }),
  compose(
    // applyMiddlewareでredux-thunk外部ライブラリをreduxに登録する
    applyMiddleware(thunk),
    // redux dev tools を使用するための記述
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
