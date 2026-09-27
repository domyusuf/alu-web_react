import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  login: {
    margin: '50px'
  }
});

function Login() {
  return (
    <React.Fragment>
      <div className={`App-body ${css(styles.login)}`}>
        <p>Login to access the full dashboard</p>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" />
        <button>OK</button>
      </div>
    </React.Fragment>
  );
}

export default Login;
