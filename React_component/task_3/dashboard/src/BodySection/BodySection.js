import React from 'react';
import PropTypes from 'prop-types';

function BodySection({ title, children }) {
  return (
    <div className="bodySection">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

BodySection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
};

BodySection.defaultProps = {
  children: null
};

export default BodySection;
