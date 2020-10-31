import { Address } from './address';
import { Gender } from './gender';
// typeというシンタックスを使用することで任意のデータ構造を定義できる
// つまりこいつはProfile型
export type Profile = {
  name: string;
  description: string;
  birthday: string;
  // 性別はGender型
  gender: Gender;
  // Address型の住所
  address: Address;
};
