// Profileはフォーム全体のレイアウトや保存の処理を行うコンポーネント
// それぞれの入力項目はスコープごとにコンポーネントに分割
import React from 'react';
import { Container, Typography } from '@material-ui/core';

import Basic from './Basic';
import useStyles from './styles';
import Address from './Address';

const Profile = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      {/* Typographyは文字列を表示するコンポーネント */}
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        基本情報
      </Typography>
      <Basic />
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        住所
      </Typography>
      <Address />
    </Container>
  );
};

export default Profile;
