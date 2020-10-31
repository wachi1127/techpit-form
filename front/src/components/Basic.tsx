// Basicは基本情報の入力を管理するコンポーネント
import React from 'react';
// reduxに接続
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';

import useStyles from './styles';
import { RootState } from '../domain/entity/rootState';

import { Profile } from '../domain/entity/profile';
import { PROFILE } from '../domain/services/profile';
import profileActions from '../store/profile/actions';

const Basic = () => {
  // dispatchを使用可能にしてくれる関数を生成する = useDispatch
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const classes = useStyles();
  // 更新したい項目だけを受け取ってreducerにdispatchしている
  const handleChange = (member: Partial<Profile>) => {
    dispatch(profileActions.setProfile(member));
  };

  return (
    <>
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.NAME}
        value={profile.name}
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <TextField
        fullWidth
        multiline
        className={classes.formField}
        rows={5}
        label={PROFILE.DESCRIPTION}
        value={profile.description}
        onChange={(e) => handleChange({ description: e.target.value })}
      />
    </>
  );
};

export default Basic;
