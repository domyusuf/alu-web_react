import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/holberton-logo.jpg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/uiActionCreators';

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

export class Header extends React.Component {
  render() {
    const { user, logout } = this.props;
    return (
      <div className={`App-header ${css(styles.header)}`}>
        <img className={css(styles.logo)} src={logo} alt="Holberton logo" />
        <h1>School dashboard</h1>
        {user && user.email && (
          <section id="logoutSection">
            Welcome {user.email} (<a href="#logout" onClick={(event) => {
              event.preventDefault();
              logout();
            }}>logout</a>)
          </section>
        )}
      </div>
    );
  }
}

Header.propTypes = { user: PropTypes.shape({ email: PropTypes.string }), logout: PropTypes.func };
Header.defaultProps = { user: null, logout: () => {} };
export function mapStateToProps(state) { return { user: state.ui.get('user') }; }

export default connect(mapStateToProps, { logout })(Header);
