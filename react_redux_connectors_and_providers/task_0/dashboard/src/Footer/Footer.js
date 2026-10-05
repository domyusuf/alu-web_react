import React from 'react';
import './Footer.css';
import { getFullYear, getFooterCopy } from '../utils/utils';
import AppContext from '../App/AppContext';

function Footer() {
  return (
    <div className="App-footer">
      <p>Copyright {getFullYear()} - {getFooterCopy(true)}</p>
      <AppContext.Consumer>
        {({ user }) => user.isLoggedIn && (
        <p><a href="#contact">Contact us</a></p>
      )}
      </AppContext.Consumer>
    </div>
  );
}

export default Footer;
