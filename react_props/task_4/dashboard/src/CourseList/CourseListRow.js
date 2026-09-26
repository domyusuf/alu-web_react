import React from 'react';
import PropTypes from 'prop-types';

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  return (
    <tr>
      {isHeader ? (
        textSecondCell === null ? (
          <th colSpan="2">{textFirstCell}</th>
        ) : (
          <React.Fragment>
            <th>{textFirstCell}</th>
            <th>{textSecondCell}</th>
          </React.Fragment>
        )
      ) : (
        <React.Fragment>
          <td>{textFirstCell}</td>
          <td>{textSecondCell}</td>
        </React.Fragment>
      )}
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.string
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null
};

export default CourseListRow;
