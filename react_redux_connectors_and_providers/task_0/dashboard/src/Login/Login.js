import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  login: {
    margin: '50px',
    '@media (max-width: 900px)': { margin: '20px' }
  },
  label: {
    '@media (max-width: 900px)': { display: 'block' }
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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      enableSubmit: false
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.updateSubmitState = this.updateSubmitState.bind(this);
  }

  updateSubmitState() {
    this.setState(({ email, password }) => ({
      enableSubmit: email.length > 0 && password.length > 0
    }));
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value }, this.updateSubmitState);
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value }, this.updateSubmitState);
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.props.logIn(this.state.email, this.state.password);
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className={`App-body ${css(styles.login)}`}>
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit}>
          <label className={css(styles.label)} htmlFor="email">Email: </label>
          <input
            className={css(styles.input)}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChangeEmail}
          />
          <label className={css(styles.label)} htmlFor="password">Password: </label>
          <input
            className={css(styles.input)}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
          />
          <input
            className={css(styles.button)}
            type="submit"
            value="OK"
            disabled={!enableSubmit}
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = { logIn: PropTypes.func };
Login.defaultProps = { logIn: () => {} };

export default Login;
