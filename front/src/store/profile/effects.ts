import { Dispatch } from 'redux';
import profileActions from './actions';
import { Address } from '../../domain/entity/address';

import {
  isCompletePostalcode,
  sanitizePostalcode,
} from '../../domain/services/address';

export const searchAddressFromPostalcode = (code: string) => async (
  dispatch: Dispatch
) => {
  if (!isCompletePostalcode(code)) return;
  // fetch()はPromise<Response>型を返してくれる
  // awaitでPromiseを解決しているので、const res はResponse型
  // Response型はjson()を持っていて、実行することでresponse bodyのjsonをJSオブジェクトにする
  const res = await fetch(
    `https://apis.postcode-jp.com/api/v3/postcodes?apikey=${
      process.env.REACT_APP_POSTALCODE_ID
    }&postcode=${sanitizePostalcode(code)}`
  );
  const result = await res.json();

  if (!result.data[0]) return;

  const address: Partial<Address> = {
    prefecture: result.data[0].pref,
    city: result.data[0].city + result.data[0].town,
  };
  // 新しいstateをdispatchして完了
  dispatch(profileActions.searchAddress.done({ result: address, params: {} }));
};

// 取得データの例
// ----------------------------
// {
//   "data": [
//     {
//       "allCode": "13113",
//       "prefCode": "13",
//       "cityCode": "113",
//       "postcode": "1500002",
//       "oldPostcode": "150",
//       "hiragana": {
//         "pref": "とうきょうと",
//         "city": "しぶやく",
//         "town": "しぶや",
//         "allAddress": "とうきょうとしぶやくしぶや"
//       },
//       "halfWidthKana": {
//         "pref": "ﾄｳｷｮｳﾄ",
//         "city": "ｼﾌﾞﾔｸ",
//         "town": "ｼﾌﾞﾔ",
//         "allAddress": "ﾄｳｷｮｳﾄｼﾌﾞﾔｸｼﾌﾞﾔ"
//       },
//       "fullWidthKana": {
//         "pref": "トウキョウト",
//         "city": "シブヤク",
//         "town": "シブヤ",
//         "allAddress": "トウキョウトシブヤクシブヤ"
//       },
//       "generalPostcode": true,
//       "officePostcode": false,
//       "location": {
//         "latitude": 35.66022872924805,
//         "longitude": 139.70738220214844
//       },
//       "pref": "東京都",
//       "city": "渋谷区",
//       "town": "渋谷",
//       "allAddress": "東京都渋谷区渋谷"
//     }
//   ],
//   "size": 1,
//   "limit": 10,
//   "hasNext": false,
//   "hasPrev": false,
//   "version": "2020-04-26T00:04:26+0900"
// }
