import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#f5f5f5ab'
  },
  rowChecked: {
    backgroundColor: '#e6e4e4'
  },
  headerRow: {
    backgroundColor: '#deb5b545'
  },
  cell: {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left'
  },
  headerCell: {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'center'
  }
});

export function CourseListRow({ id, isHeader, textFirstCell, textSecondCell, isChecked, onChangeRow }) {

  return (
    <tr className={css(isHeader ? styles.headerRow : (isChecked ? styles.rowChecked : styles.row))}>
      {isHeader ? (
        textSecondCell === null ? (
          <th className={css(styles.headerCell)} colSpan="2">{textFirstCell}</th>
        ) : (
          <React.Fragment>
            <th className={css(styles.headerCell)}>{textFirstCell}</th>
            <th className={css(styles.headerCell)}>{textSecondCell}</th>
          </React.Fragment>
        )
      ) : (
        <React.Fragment>
          <td className={css(styles.cell)}>
            <input
              type="checkbox"
              aria-label={`Select ${textFirstCell}`}
              checked={isChecked}
              onChange={(event) => onChangeRow(id, event.target.checked)}
            />
            {textFirstCell}
          </td>
          <td className={css(styles.cell)}>{textSecondCell}</td>
        </React.Fragment>
      )}
    </tr>
  );
}

CourseListRow.propTypes = {
  id: PropTypes.string,
  isChecked: PropTypes.bool,
  onChangeRow: PropTypes.func,
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

CourseListRow.defaultProps = {
  id: '',
  isChecked: false,
  onChangeRow: () => {},
  isHeader: false,
  textSecondCell: null
};

export default CourseListRow;
