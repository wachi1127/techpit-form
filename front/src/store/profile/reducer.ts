import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Profile } from '../../domain/entity/profile';
import profileActions from './actions';

// Profile型のinitという初期値
const init: Profile = {
  name: '',
  description: '',
  birthday: '',
  gender: '',
};

// reducerWithInitialStateはtypescript-fsa-reducersの関数
// reducerを生成するのに使用する
// case()は第一引数にactionを、第２引数にコールバック関数を渡す
const profileReducer = reducerWithInitialState(init).case(
  profileActions.setProfile,
  // コールバック関数の1:profileというstateそのもの
  // 2:アクションから渡ってきたpayloadがくる
  (state, payload) => ({
    ...state,
    ...payload,
  })
);

export default profileReducer;
