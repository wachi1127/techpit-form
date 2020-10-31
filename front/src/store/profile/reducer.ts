import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Profile } from '../../domain/entity/profile';
import profileActions from './actions';

// Profile型のinitという初期値
const init: Profile = {
  name: '',
  description: '',
  birthday: '',
  gender: '',
  address: {
    postalcode: '',
    prefecture: '',
    city: '',
    restAddress: '',
  },
};

// reducerWithInitialStateはtypescript-fsa-reducersの関数
// reducerを生成するのに使用する
// case()は第一引数にactionを、第２引数にコールバック関数を渡す
const profileReducer = reducerWithInitialState(init)
  .case(
    // setProfileアクション時の処理
    profileActions.setProfile,
    // コールバック関数の1:profileというstateそのもの
    // 2:アクションから渡ってきたpayloadがくる
    (state, payload) => ({
      ...state,
      ...payload,
    })
  )
  // setAddressアクション時の処理
  .case(profileActions.setAddress, (state, payload) => ({
    ...state,
    // ...state.addressでまずこれまでのstate（今現在入れてない住所のstate）を展開
    // 次にpayloadを展開することで、いま値を入れているaddressのプロパティのみ書き換え
    address: { ...state.address, ...payload },
  }))
  .case(profileActions.searchAddress.done, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload.result },
  }));

export default profileReducer;
