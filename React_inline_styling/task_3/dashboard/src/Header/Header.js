import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/holberton-logo.jpg';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    color: '#e0354b',
    borderBottom: '3px solid #e0354b'
  },
  logo: {
    width: '200px',
    height: '200px'
  }
});

function Header() {
  return (
    <div className={`App-header ${css(styles.header)}`}>
      <img className={css(styles.logo)} src={logo} alt="Holberton logo" />
      <h1>School dashboard</h1>
    </div>
  );
}

export default Header;
