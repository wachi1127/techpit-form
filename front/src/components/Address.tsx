import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';

import { PROFILE } from '../domain/services/profile';

import { RootState } from '../domain/entity/rootState';
// コンポーネント名もAddressなので、IAddress（Interface）としてインポート
import { Address as IAddress } from '../domain/entity/address';

import profileActions from '../store/profile/actions';

import { isPostalcode } from '../domain/services/address';

import { searchAddressFromPostalcode } from '../store/profile/effects';

import useStyles from './styles';

const Address = () => {
  // dispatchとprofileを使用可能にする
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const classes = useStyles();

  const handleAddressChange = (member: Partial<IAddress>) => {
    dispatch(profileActions.setAddress(member));
  };
  // 郵便番号の値設定
  const handlePostalcodeChange = (code: string) => {
    // 正規表現でチェックしてfalseだったらreturn
    if (!isPostalcode(code)) return;

    dispatch(profileActions.setAddress({ postalcode: code }));
    // APIを叩いて住所取得してstateにセットする処理
    dispatch(searchAddressFromPostalcode(code));
  };

  return (
    <>
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.ADDRESS.POSTALCODE}
        value={profile.address.postalcode}
        // 郵便番号は正しい形式かチェックを入れる
        onChange={(e) => handlePostalcodeChange(e.target.value)}
      />
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.ADDRESS.PREFECTURE}
        value={profile.address.prefecture}
        onChange={(e) => handleAddressChange({ prefecture: e.target.value })}
      />
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.ADDRESS.CITY}
        value={profile.address.city}
        onChange={(e) => handleAddressChange({ city: e.target.value })}
      />
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.ADDRESS.RESTADDRES}
        value={profile.address.restAddress}
        onChange={(e) => handleAddressChange({ restAddress: e.target.value })}
      />
    </>
  );
};

export default Address;
