import React from 'react';
import './Footer.css';
import { getFullYear, getFooterCopy } from '../utils/utils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export function Footer({ user }) {
  return (
    <div className="App-footer">
      <p>Copyright {getFullYear()} - {getFooterCopy(true)}</p>
      {user && user.email && (
        <p><a href="#contact">Contact us</a></p>
      )}
    </div>
  );
}

Footer.propTypes = { user: PropTypes.shape({ email: PropTypes.string }) };
Footer.defaultProps = { user: null };
export function mapStateToProps(state) { return { user: state.ui.get('user') }; }
export default connect(mapStateToProps)(Footer);
