import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/holberton-logo.jpg';
import AppContext, { defaultLogOut, defaultUser } from '../App/AppContext';

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

class Header extends React.Component {
  render() {
    const { user = defaultUser, logOut = defaultLogOut } = this.context || {};
    return (
      <div className={`App-header ${css(styles.header)}`}>
        <img className={css(styles.logo)} src={logo} alt="Holberton logo" />
        <h1>School dashboard</h1>
        {user.isLoggedIn && (
          <section id="logoutSection">
            Welcome {user.email} (<a href="#logout" onClick={(event) => {
              event.preventDefault();
              logOut();
            }}>logout</a>)
          </section>
        )}
      </div>
    );
  }
}

Header.contextType = AppContext;

export default Header;
