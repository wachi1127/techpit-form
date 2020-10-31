import actionCreatorFactory from 'typescript-fsa';
import { Address } from '../../domain/entity/address';
import { Profile } from '../../domain/entity/profile';

import { Career } from '../../domain/entity/career';

const actionCreator = actionCreatorFactory();

const profileActions = {
  // 型引数ジェネリクスを使用している
  // Profile項目のうち必要なものだけ渡すことができる
  // 含まれなかったProfileの項目はundefinedとして扱われる
  // Profileに含まれないものを渡すとコンパイルエラー
  setProfile: actionCreator<Partial<Profile>>('SET_PROFILE'),
  // このアクションをdispatchする際にわたすpayloadはPartian<Address>という型
  setAddress: actionCreator<Partial<Address>>('SET_ADDRESS'),
  // actionCreator.async()により非同期処理のstart, done, fail３つのactionを作成できる
  // とりあえずdoneだけで良いので引数の２個めだけ定義
  searchAddress: actionCreator.async<{}, Partial<Address>, {}>(
    'SEARCH_ADDRESS'
  ),
  // 複数の職歴を入力できるcareerでは、何番目の職歴なのかという情報も必要
  setCareer: actionCreator<{ career: Partial<Career>; index: number }>(
    'SET_CAREER'
  ),
  // 何番目の職歴を削除するか指定
  deleteCareer: actionCreator<number>('DELETE_CAREER'),
  // 追加。payloadは無い。追加の際には初期値の職歴を新たに追加して職歴のフォームを追加で表示させるため
  addCareer: actionCreator<{}>('ADD_CAREER'),
};

export default profileActions;
