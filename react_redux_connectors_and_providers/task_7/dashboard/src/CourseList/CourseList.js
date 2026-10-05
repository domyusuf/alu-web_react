import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import CourseListRow from './CourseListRow';
import { fetchCourses, selectCourse, unSelectCourse } from '../actions/courseActionCreators';
import { getListCourses } from '../selectors/courseSelector';

const styles = StyleSheet.create({ courseList: { width: '100%', borderCollapse: 'collapse' } });
export class CourseList extends React.Component {
  componentDidMount() { this.props.fetchCourses(); }
  onChangeRow = (id, checked) => {
    if (checked) this.props.selectCourse(id);
    else this.props.unSelectCourse(id);
  };
  render() {
    const { listCourses } = this.props;
    return (
      <table id="CourseList" className={css(styles.courseList)}>
        <thead>
          <CourseListRow textFirstCell="Available courses" isHeader />
          <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader />
        </thead>
        <tbody>
          {listCourses.size === 0 ? <tr><td colSpan="2">No course available yet</td></tr> :
            listCourses.map(course => <CourseListRow
              key={course.get('id')} id={course.get('id')}
              textFirstCell={course.get('name')} textSecondCell={course.get('credit')}
              isChecked={course.get('isSelected')} onChangeRow={this.onChangeRow}
            />)}
        </tbody>
      </table>
    );
  }
}
CourseList.propTypes = { listCourses: PropTypes.instanceOf(List), fetchCourses: PropTypes.func, selectCourse: PropTypes.func, unSelectCourse: PropTypes.func };
CourseList.defaultProps = { listCourses: List(), fetchCourses: () => {}, selectCourse: () => {}, unSelectCourse: () => {} };
export function mapStateToProps(state) { return { listCourses: getListCourses(state.courses) }; }
export const mapDispatchToProps = { fetchCourses, selectCourse, unSelectCourse };
export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
