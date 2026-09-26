import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection';
import './BodySection.css';

function BodySectionWithMarginBottom(props) {
  return (
    <div className="bodySectionWithMargin">
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
