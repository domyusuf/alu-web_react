import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  login: {
    margin: '50px',
    '@media (max-width: 900px)': {
      margin: '20px'
    }
  },
  label: {
    '@media (max-width: 900px)': {
      display: 'block'
    }
  },
  input: {
    '@media (max-width: 900px)': {
      display: 'block',
      marginBottom: '10px'
    }
  },
  button: {
    '@media (max-width: 900px)': {
      display: 'block',
      marginTop: '10px'
    }
  }
});

function Login() {
  return (
    <React.Fragment>
      <div className={`App-body ${css(styles.login)}`}>
        <p>Login to access the full dashboard</p>
        <label className={css(styles.label)} htmlFor="email">Email: </label>
        <input className={css(styles.input)} type="email" id="email" name="email" />
        <label className={css(styles.label)} htmlFor="password">Password: </label>
        <input className={css(styles.input)} type="password" id="password" name="password" />
        <button className={css(styles.button)}>OK</button>
      </div>
    </React.Fragment>
  );
}

export default Login;
