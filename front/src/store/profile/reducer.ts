import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Profile } from '../../domain/entity/profile';
import profileActions from './actions';

import { Career } from '../../domain/entity/career';

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
  careers: [],
};

const initCareer: Career = {
  company: '',
  position: '',
  startAt: '',
  endAt: '',
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
  }))
  // 職歴の編集
  .case(profileActions.setCareer, (state, payload) => ({
    // これまでの状態を展開して、careerだけ新しいものに更新
    ...state,
    // map()はCareer[]をmapして新しいCareer[]を返している
    // indexが一致するときだけpayloadの内容の新しいCareerを返して、それ以外は何もせずそのまま返している
    careers: state.careers.map((c, i) =>
      i === payload.index ? { ...c, ...payload.career } : c
    ),
  }))
  // 職歴の削除
  // filter()を用いてpayloadで渡ってきたindexと一致する場合のみfalseを返す
  // => 削除したいindexと一致しないものだけを返して新しいcareerとする
  .case(profileActions.deleteCareer, (state, payload) => ({
    ...state,
    careers: state.careers.filter((_, i) => i !== payload),
  }))
  .case(profileActions.addCareer, (state) => ({
    ...state,
    careers: [...state.careers, initCareer],
  }));

export default profileReducer;
