import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import BodySection from './BodySection';

const styles = StyleSheet.create({
  bodySectionWithMargin: {
    marginBottom: '40px'
  }
});

function BodySectionWithMarginBottom(props) {
  return (
    <div className={`bodySectionWithMargin ${css(styles.bodySectionWithMargin)}`}>
      <BodySection {...props} />
    </div>
  );
}

BodySectionWithMarginBottom.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
};

BodySectionWithMarginBottom.defaultProps = {
  children: null
};

export default BodySectionWithMarginBottom;
