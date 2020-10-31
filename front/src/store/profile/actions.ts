import actionCreatorFactory from 'typescript-fsa';
import { Address } from '../../domain/entity/address';
import { Profile } from '../../domain/entity/profile';

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
};

export default profileActions;
