import React, { useState } from 'react';
import MyDrawer from '../components/common/myDrawer';
import '../style/view/login.scss';
import { Button, Card, CardActions, CardContent, CardHeader, TextField, Snackbar } from '@material-ui/core';
import { loginPost } from '../util/http';
import { useHistory } from 'react-router-dom';

export default function Login(): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const [uid, setUid] = useState<string>('');
  const myHistory = useHistory();
  const [error, setError] = useState<boolean>(false);
  return (
    <MyDrawer className="login-page">
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={error}
        autoHideDuration={6000}
        onClose={() => {
          setError(false);
        }}
        message="账号密码错误"
      />
      <Card>
        <CardHeader title="登陆" />
        <CardContent>
          <TextField
            label="账号"
            value={uid}
            onChange={(event) => {
              setUid(event.target.value);
            }}
          />
          <br />
          <TextField
            type={'password'}
            value={password}
            label="密码"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              loginPost(password, uid).then((res) => {
                if (res.success) {
                  myHistory.push('/');
                } else {
                  setError(true);
                }
              });
            }}
          >
            登陆
          </Button>
        </CardActions>
      </Card>
    </MyDrawer>
  );
}
